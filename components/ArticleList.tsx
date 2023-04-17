import { useRouter } from "next/router";
import { Article } from "../types/common";
import { formatDate } from "../utils/formatUtil";

type ArticleListProps = {
  articles: Array<Article>;
};

export const ArticleList = ({ articles }: ArticleListProps) => {
  const router = useRouter();
  const onClickCard = (id: string) => {
    router.push(`/article/${id}`);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10 ">
      {articles.map(article => (
        <div
          className="rounded group overflow-hidden shadow-lg cursor-pointer"
          key={article.id}
          onClick={() => onClickCard(article.id)}>
          <div className="flex justify-center items-center overflow-hidden h-52">
            <img
              className="w-full object-center group-hover:scale-110 group-hover:opacity-60 transition duration-300"
              src={article.eyecatch.url}
              alt={article.title}
            />
          </div>
          <div className="p-6">
            <div className="text-time text-xs">
              {formatDate(article.publishedAt)}
            </div>
            <div className="pt-2 line-clamp-2">{article.title}</div>
            <div className="pt-4">
              {article.category.map(category => (
                // <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span key={category.id} className="px-2 py-1 ml-2 text-xs bg-category">
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};