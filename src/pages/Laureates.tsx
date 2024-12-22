import React, { useEffect } from "react";
import Filter from "../components/Filter";
import Preloader from "../components/Preloader";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import { useLaureatesStore } from "../store/useLaureatesStore";
import useCategoryName from "../hooks/useCategoryName";
import "../styles/pages.scss";

export default function Laureates() {
  const { loadLaureates, laureate, loading } = useLaureatesStore();
  const { getNormalName, getNormalClassName } = useCategoryName();

  useEffect(() => {
    loadLaureates({ name: "", category: "", birthDate: "", offset: "0" });
  }, [loadLaureates]);

  const filterItems = (params: any) => {
    loadLaureates({
      ...params,
      offset: "0",
    });
  };

  return (
    <div className="wrapper">
      <Filter isAwardPage={false} />
      {loading ? (
        <Preloader />
      ) : (
        <ul className="wrapper__list">
          {laureate.map((item, index) => (
            <li key={index}>
              <Card
                key={index}
                title={item.fullName?.en}
                subtitle={item.birth?.date || ""}
                description={`${item.birth?.place?.country?.en} - ${item.birth?.place?.city?.en}`}
                link={item?.wikipedia?.english}
                listItems={item.nobelPrizes?.map((prize: any) => prize.category.en)}
                onTitleClick={() => filterItems({ name: item.familyName.en })}
                onSubtitleClick={() =>
                  filterItems({
                    birthDate: item.birth?.date?.split("-")[0] || "",
                  })
                }
                onLaureateCategoryClick={(item: any) => filterItems({ category: item })}
              />
            </li>
          ))}
        </ul>
      )}
      <Pagination isAwardPage={false} />
    </div>
  );
}
