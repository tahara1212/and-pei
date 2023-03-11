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

export const Layout = ({
  children,
  articles,
  categoryList,
  publishedAt,
  title,
}: LayoutProps) => {
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
      <div className="container max-w-[860px] px-4 md:px-0 mx-auto mt-10 mb-20">
        {title && <h1 className="text-lg mb-6">{title}</h1>}
        {children}
      </div>
      <aside className="w-full border-t border-t-mist">
        <div className="flex flex-col md:flex-row items-top justify-between gap-6 max-w-[860px] p-10 md:py-10 mx-auto text-center md:text-left">
          <div className="leading-relaxed text-gray">
            <div className="inline-block md:block pb-1 text-xl border-b">
              Categories
            </div>
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
            <div className="inline-block md:block pb-1 text-xl border-b">
              Archives
            </div>
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
            <div className="inline-block md:block pb-1 text-xl border-b">
              Link
            </div>
            <ul className="p-2">
              <li className="hover:opacity-60 transition">
                <a
                  href="https://twitter.com/Talk10997764"
                  target="_blank"
                  rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li className="hover:opacity-60 transition">
                <a
                  href="https://qiita.com/st_12"
                  target="_blank"
                  rel="noopener noreferrer">
                  Qiita
                </a>
              </li>
              <li className="hover:opacity-60 transition">
                <a
                  href="https://github.com/tahara1212"
                  target="_blank"
                  rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <Footer />
    </>
  );
};
