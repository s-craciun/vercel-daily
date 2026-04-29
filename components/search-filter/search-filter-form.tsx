import { type FC } from "react";
import { SearchBox } from "./search-box";
import { Button } from "../button/button";
import { Select } from "./select";
import { applySearchFilters } from "@/utils/search-filter-acrions";
import { type ISearchPageProps } from "@/app/search/page";
import { getCategories } from "@/utils/cached-fetch";

export const SearchFilterForm: FC<ISearchPageProps> = async ({
  searchParams,
}) => {
  const [{ search, category }, categories] = await Promise.all([
    searchParams,
    getCategories(),
  ]);
  return (
    <form className="mb-10" action={applySearchFilters}>
      <div className="flex flex-col md:flex-row items-center gap-5 mb-5">
        <SearchBox value={search} />
        <div className="w-[100%] md:w-[20%]">
          <Select value={category} options={categories} />
        </div>
      </div>
      <Button type="submit">Apply filters</Button>
    </form>
  );
};
