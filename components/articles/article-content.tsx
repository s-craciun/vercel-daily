import { type ArticleContentBlock, BlockType } from "@/types/article-content";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { type IArticle } from "@/types/article";
import { MarkdownComponents } from "@/app/articles/[slug]/page";
import { SubscribeForm } from "../subscribe-form";

interface IArticleContentProps {
  article: IArticle;
}

export const ArticleContent = ({
  article,
  isSubscribed,
}: IArticleContentProps & { isSubscribed: boolean }) => {
  const content = isSubscribed
    ? article.content
    : ([
        {
          type: BlockType.Paragraph,
          text: article.excerpt || "Subscribe to read the full article!",
        },
      ] as ArticleContentBlock[]);
  return (
    <div className="space-y-3">
      {content?.map((block, i) => {
        switch (block.type) {
          case BlockType.Paragraph:
            return (
              <ReactMarkdown key={i} components={MarkdownComponents}>
                {block.text}
              </ReactMarkdown>
            );
          case BlockType.Heading:
            return block.level === 2 ? (
              <h2 className="text-lg font-semibold mt-5 mb-1" key={i}>
                {block.text}
              </h2>
            ) : (
              <h3 className="text-sm font-semibold mt-5 mb-1" key={i}>
                {block.text}
              </h3>
            );
          case BlockType.Blockquote:
            return (
              <blockquote
                key={i}
                className="leading-relaxed italic text-muted-foreground text-sm"
              >
                <ReactMarkdown components={MarkdownComponents}>
                  {block.text}
                </ReactMarkdown>
              </blockquote>
            );
          case BlockType.UnorderedList:
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <ReactMarkdown components={MarkdownComponents}>
                      {item}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            );
          case BlockType.OrderedList:
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <ReactMarkdown components={MarkdownComponents}>
                      {item}
                    </ReactMarkdown>
                  </li>
                ))}
              </ol>
            );
          case BlockType.Image:
            return (
              <figure key={i} className="my-4">
                <div className="relative w-full w-max-[40vw] aspect-[16/9]">
                  <Image
                    src={block.src || `/${article.slug}-img-${i}`}
                    alt={block.alt || `/${article.title} image ${i}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover rounded-lg"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                    <ReactMarkdown components={MarkdownComponents}>
                      {block.caption}
                    </ReactMarkdown>
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
      {!isSubscribed && (
        <div className="w-[100%] border border-gray-200 rounded-md py-10 px-10 shadow-md mb-10">
          <p className="mb-3 text-center text-sm text-muted-foreground">
            To read the full article, subscribe now.
          </p>
          <SubscribeForm isSubscribed={false} />
        </div>
      )}
    </div>
  );
};
