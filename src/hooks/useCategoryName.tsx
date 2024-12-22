import { useCallback } from "react";

const sortCategoryname = {
  che: "Chemistry",
  eco: "Economic Sciences",
  lit: "Literature",
  pea: "Peace",
  phy: "Physics",
  med: "Physiology or Medicine",
};

const useCategoryName = () => {
  const getNormalName = useCallback((name: string) => {
    return (
      Object.keys(sortCategoryname).find(
        (key) => sortCategoryname[key as keyof typeof sortCategoryname] === name
      ) || name
    );
  }, []);

  const getNormalClassName = useCallback(
    (category: string) => {
      const name = getNormalName(category);
      return `category-${name}`;
    },
    [getNormalName]
  );

  return { getNormalName, getNormalClassName };
};

export default useCategoryName;
