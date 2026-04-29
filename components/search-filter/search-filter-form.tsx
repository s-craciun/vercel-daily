"use client";

import { type FC, useTransition, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchBox } from "./search-box";
import { Button } from "../button/button";
import { Select } from "./select";
import { type ICategory } from "@/types/types";

interface ISearchFilterFormProps {
  search?: string;
  category?: string;
  categories: ICategory[];
}

export const SearchFilterForm: FC<ISearchFilterFormProps> = ({
  search,
  category,
  categories,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search")?.toString().trim() || "";
    const categoryValue = formData.get("category")?.toString() || "all";

    const params = new URLSearchParams();

    if (searchValue) {
      params.set("search", searchValue);
    }

    if (categoryValue && categoryValue !== "all") {
      params.set("category", categoryValue);
    }

    startTransition(() => {
      router.replace(`/search?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <form className="mb-10" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center gap-5 mb-5">
        <SearchBox value={search} />
        <div className="w-[100%] md:w-[20%]">
          <Select value={category} options={categories} />
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Applying filters..." : "Apply filters"}
      </Button>
    </form>
  );
};
