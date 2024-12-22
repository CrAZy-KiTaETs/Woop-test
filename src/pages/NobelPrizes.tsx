import { useEffect } from "react";
import { useNobelStore } from "../store/useNobelStore";
import Filter from "../components/Filter";
import "../styles/pages.scss";

import Preloader from "../components/Preloader";
import Pagination from "../components/Pagination";
import useCategoryName from "../hooks/useCategoryName";
import Card from "../components/Card";

type FilterParams = {
  name: string;
  year: string;
};

export default function NobelPrizes() {
  const { awards, loading, loadAwards } = useNobelStore();
  const { getNormalName } = useCategoryName();
  useEffect(() => {
    loadAwards({ year: "", category: "", offset: "0" });
  }, [loadAwards]);

  const filterItems = (params: FilterParams) => {
    const categoryKey = getNormalName(params.name);
    loadAwards({ year: params.year, category: categoryKey, offset: "0" });
    console.log(params, categoryKey);
  };

  return (
    <div className="wrapper">
      <Filter isAwardPage={true} />
      {loading ? (
        <Preloader />
      ) : (
        <ul className="wrapper__list">
          {awards?.map((award, index) => (
            <li key={index} onClick={() => console.log(award)}>
              <Card
                key={index}
                title={award.category.en}
                subtitle={award.dateAwarded}
                listItems={award.laureates?.map(
                  (laureate) =>
                    `${laureate.knownName?.en || laureate.orgName?.en} - ${laureate.motivation.en}`
                )}
                onTitleClick={() => filterItems({ name: award.category.en, year: "" })}
                onSubtitleClick={() => filterItems({ name: "", year: award.awardYear })}
              />
            </li>
          ))}
        </ul>
      )}

      <Pagination isAwardPage={true} />
    </div>
  );
}
