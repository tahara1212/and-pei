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
      <aside className="w-full bg-gray">
        <div className="w-[860px] py-4 mx-auto">
          <ul className="px-2 text-white leading-relaxed">
            {categoryList.map(category => (
              <li key={category.id}>
                {`${category.name} (${findCategoryLength(category.name)})`}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <Footer />
    </>
  );
};
