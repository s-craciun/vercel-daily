import { BlockType } from "@/types/article-content";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { type IArticle } from "@/types/article";
import { MarkdownComponents } from "@/app/articles/[slug]/page";

interface IArticleContentProps {
  article: IArticle;
}

export const ArticleContent = ({ article }: IArticleContentProps) => {
  return (
    <div className="space-y-3">
      {article.content?.map((block, i) => {
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
              <figure key={i}>
                <Image
                  src={block.src || `/${article.slug}-img-${i}`}
                  alt={block.alt || `/${article.title} image ${i}`}
                  width={600}
                  height={400}
                />
                {block.caption && (
                  <figcaption>
                    <ReactMarkdown components={MarkdownComponents}>
                      {block.caption}
                    </ReactMarkdown>
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
};
