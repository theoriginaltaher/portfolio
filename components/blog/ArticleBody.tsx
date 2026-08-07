import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <div className="article-body"><PortableText value={value} components={{ block: { normal: ({ children }) => <p>{children}</p>, h2: ({ children }) => <h2>{children}</h2> } }} /></div>;
}
