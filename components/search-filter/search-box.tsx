import { type FC } from "react";
import Image from "next/image";

interface ISearchBoxProps {
  value?: string;
}

export const SearchBox: FC<ISearchBoxProps> = ({ value }) => {
  return (
    <div className="h-10 w-[100%] border border-gray-200 rounded-lg flex">
      <label
        htmlFor="search-articles"
        className="w-10 h-10 flex justify-center items-center"
      >
        <Image
          className="opacity-50"
          src="/search-outline-svgrepo-com.svg"
          alt="Search icon"
          width={20}
          height={20}
        />
      </label>
      <input
        id="search-articles"
        type="search"
        defaultValue={value}
        name="search"
        placeholder="Search articles..."
        className="w-full h-10 focus:outline-none"
      />
    </div>
  );
};
