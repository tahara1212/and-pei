import Link from 'next/link';
import { Article, Category, PublishedAt } from '../types/common';
import { formatDateForArchives } from '../utils/formatUtil';
import { groupByCreatedAt } from '../utils/groupByUtil';
import { Footer } from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  articles: Array<Article>;
  categoryList: Array<Category>;
  publishedAt: Array<PublishedAt>;
  title?: string;
};

export const Layout = ({ children, articles, categoryList, publishedAt, title }: LayoutProps) => {
  console.log(groupByCreatedAt(publishedAt));
  const findCategoryLength = (categoryName: string) => {
    const length = articles.reduce((prev, current) => {
      const isCategoryMatched = current.category.some(
        category => category.name === categoryName,
      );
      if (isCategoryMatched) {
        prev++;
      }
      return prev;
    }, 0);
    return length;
  };
  return (
    <>
      <Header />
      <div className="container w-[860px] mx-auto mt-10 mb-20">
        <h1 className="text-lg mb-6">{title}</h1>
        {children}
      </div>
      <aside className="w-full border-t border-t-mist">
        <div className="flex items-top justify-between w-[860px] py-10 mx-auto">
          <div className="leading-relaxed text-gray">
            <div className="pb-1 text-lg border-b">Categories</div>
            <ul className="p-2">
              {categoryList.map(category => (
                <li key={category.id} className="hover:opacity-60 transition">
                  <Link href={`/category/${category.id}`}>
                    {`${category.name} (${findCategoryLength(category.name)})`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="leading-relaxed text-gray">
            <div className="pb-1 text-lg border-b">Archives</div>
            <ul className="p-2">
              {Object.keys(groupByCreatedAt(publishedAt)).map(month => (
                <li key={month} className="hover:opacity-60 transition">
                  <Link href={`/archive/${month}`}>
                    {`${formatDateForArchives(month)} (${
                      groupByCreatedAt(publishedAt)[month].length
                    })`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="leading-relaxed text-gray">
            <div className="pb-1 text-lg border-b">Link</div>
            <ul className="p-2">
              {categoryList.map(category => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>
                    {`${category.name} (${findCategoryLength(category.name)})`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      <Footer />
    </>
  );
};
