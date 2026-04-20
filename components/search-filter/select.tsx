import { type FC } from "react";
import { type ICategory } from "@/types/types";

interface ISelectProps {
  options: ICategory[];
  value?: string;
}

export const Select: FC<ISelectProps> = ({ options, value }) => {
  return (
    <select
      className="h-10 w-[100%] border border-gray-200 rounded-lg flex px-3"
      defaultValue={value}
      name="category"
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
