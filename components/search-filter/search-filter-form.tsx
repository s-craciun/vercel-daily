"use client";

import { type FC, useTransition, type SubmitEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBox } from "./search-box";
import { Button } from "../button/button";
import { Select } from "./select";
import { type ICategory } from "@/types/types";
import { buildSearchParams } from "@/utils/buildSearchParams";

interface ISearchFilterFormProps {
  categories: ICategory[];
}

export const SearchFilterForm: FC<ISearchFilterFormProps> = ({
  categories,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search")?.toString().trim() || "";
    const categoryValue = formData.get("category")?.toString() || "all";

    const params = buildSearchParams({
      search: searchValue,
      category: categoryValue,
    });

    startTransition(() => {
      router.replace(`/search?${params}`, {
        scroll: false,
      });
    });
  };

  return (
    <form className="mb-10" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center gap-5 mb-5">
        <SearchBox value={searchParam} />
        <div className="w-[100%] md:w-[20%]">
          <Select value={categoryParam} options={categories} />
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Applying filters..." : "Apply filters"}
      </Button>
    </form>
  );
};
