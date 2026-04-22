import { CONTAINER_PADDING } from "@/constants/constants";
import { getBreakingNews } from "@/utils/cached-fetch";
import Image from "next/image";
import Link from "next/link";

export const BreakingNewsBanner = async () => {
  const breakingNews = await getBreakingNews();

  return (
    !!breakingNews && (
      <Link href={`/articles/${breakingNews.articleId}`}>
        <div
          className={`bg-black text-white ${CONTAINER_PADDING} !py-4 flex gap-2`}
        >
          <Image
            src="/warning-triangle-svgrepo-com.svg"
            alt="Warning triangle"
            width={25}
            height={25}
          />
          <div>
            <h2 className="text-md font-bold">{breakingNews.headline}</h2>
            <p className="text-sm">{breakingNews.summary}</p>
          </div>
        </div>
      </Link>
    )
  );
};
