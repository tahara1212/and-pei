import { Article, Category } from '../types/common';
import { Footer } from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  articles: Array<Article>;
  categoryList: Array<Category>;
};

export const Layout = ({ children, articles, categoryList }: LayoutProps) => {
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
      <div className="container w-[860px] mx-auto my-20">{children}</div>
      <aside className="w-full border-t border-t-mist">
        <div className="flex items-center justify-between w-[860px] py-10 mx-auto">
          <div className="leading-relaxed text-gray">
            <div className="pb-1 text-lg border-b">Categories</div>
            <ul className="p-2">
              {categoryList.map(category => (
                <li key={category.id}>
                  {`${category.name} (${findCategoryLength(category.name)})`}
                </li>
              ))}
            </ul>
          </div>
          <div className="leading-relaxed text-gray">
            <div className="pb-1 text-lg border-b">Archives</div>
            <ul className="p-2">
              {categoryList.map(category => (
                <li key={category.id}>
                  {`${category.name} (${findCategoryLength(category.name)})`}
                </li>
              ))}
            </ul>
          </div>
          <div className="leading-relaxed text-gray">
            <div className="pb-1 text-lg border-b">Link</div>
            <ul className="p-2">
              {categoryList.map(category => (
                <li key={category.id}>
                  {`${category.name} (${findCategoryLength(category.name)})`}
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
