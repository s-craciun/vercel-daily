"use client";

import { type FC } from "react";
import { type ICategory } from "@/types/types";

interface ISelectProps {
  options: ICategory[];
  value?: string;
}

export const Select: FC<ISelectProps> = ({ options, value }) => {
  return (
    <select
      key={`category-select-${value}`}
      className="h-10 w-[100%] border border-gray-200 rounded-md flex px-3 cursor-pointer"
      defaultValue={value}
      name="category"
      onChange={(e) => {
        e.currentTarget.form?.requestSubmit();
      }}
    >
      <option value="all">All categories</option>
      {options.map((option) => (
        <option key={option.slug} value={option.slug}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
