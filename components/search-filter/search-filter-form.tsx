import { type FC } from "react";
import { SearchBox } from "./search-box";
import { type ICategory } from "@/types/types";
import { Button } from "../button/button";
import { Select } from "./select";
import { applySearchFilters } from "@/utils/search-filter-acrions";

interface ISearchFilterFormProps {
  initialSearch?: string;
  initialCategory?: string;
  categories: ICategory[];
}

export const SearchFilterForm: FC<ISearchFilterFormProps> = ({
  initialSearch = "",
  initialCategory = "all",
  categories,
}) => {
  return (
    <form
      className="mb-10"
      action={async (formData) => {
        "use server";
        applySearchFilters(formData);
      }}
    >
      <div className="flex items-center gap-10 mb-5">
        <SearchBox value={initialSearch} />
        <div className="w-[20%]">
          <Select value={initialCategory} options={categories} />
        </div>
      </div>
      <Button type="submit">Apply filters</Button>
    </form>
  );
};
