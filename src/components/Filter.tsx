import { useEffect, useState } from "react";
import "../styles/filter.scss";
import { FilterCategories, FilterSelectedInfo } from "@/types/filter";
import { useNobelStore } from "../store/useNobelStore";
import { useLaureatesStore } from "../store/useLaureatesStore";

interface FilterProps {
  isAwardPage: boolean;
}

const categories: FilterCategories[] = [
  { name: "Химия", value: "che" },
  { name: "Экономика", value: "eco" },
  { name: "Литература", value: "lit" },
  { name: "Мир", value: "pea" },
  { name: "Физика", value: "phy" },
  { name: "Медицина", value: "med" },
];

export default function Filter({ isAwardPage }: FilterProps) {
  const years = Array.from({ length: 2024 - 1901 + 1 }, (_, i) => 2024 - i);

  const { loadAwards, year, category } = useNobelStore();
  const {
    loadLaureates,
    birthDate,
    name: laureateName,
    category: laureateCategory,
  } = useLaureatesStore();

  const [selectedInfo, setSelectedInfo] = useState<FilterSelectedInfo>({
    year: "",
    category: "",
    birthYear: "",
    name: "",
  });

  const handleChange = (key: keyof FilterSelectedInfo, value: string) => {
    if (key === "name") {
      const isValid = /^[a-zA-Zа-яА-Я\s]*$/.test(value);
      if (!isValid) return;
    }
    setSelectedInfo((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (isAwardPage) {
      loadAwards({
        year: selectedInfo.year,
        category: selectedInfo.category,
        offset: "0",
      });
    } else {
      loadLaureates({
        name: selectedInfo.name,
        birthDate: selectedInfo.birthYear,
        category: selectedInfo.category,
        offset: "0",
      });
    }
  };

  useEffect(() => {
    if (isAwardPage) {
      setSelectedInfo((prev) => ({ ...prev, year, category }));
    } else {
      setSelectedInfo((prev) => ({
        ...prev,
        birthYear: birthDate,
        name: laureateName,
        category: laureateCategory,
      }));
    }
  }, [year, category, birthDate, laureateName, laureateCategory, isAwardPage]);

  const validateYear = (value: any) => {};

  return (
    <aside className="filter">
      {isAwardPage && (
        <>
          <InputOrSelect
            type="number"
            placeholder="Год"
            value={selectedInfo.year}
            onChange={(value) => handleChange("year", value)}
          />
          <InputOrSelect
            type="number"
            placeholder="Год"
            value={selectedInfo.year}
            options={years.map((year) => ({ label: year.toString(), value: year }))}
            onChange={(value) => handleChange("year", value)}
          />
        </>
      )}
      <InputOrSelect
        placeholder="Категория"
        value={selectedInfo.category}
        options={categories.map((cat) => ({ label: cat.name, value: cat.value }))}
        onChange={(value) => handleChange("category", value)}
      />
      {!isAwardPage && (
        <>
          <InputOrSelect
            type="number"
            placeholder="Год рождения"
            value={selectedInfo.birthYear || ""}
            onChange={(value) => handleChange("birthYear", value)}
          />
          <InputOrSelect
            type="text"
            placeholder="Имя"
            value={selectedInfo.name || ""}
            onChange={(value) => handleChange("name", value)}
          />
        </>
      )}
      <button onClick={validate}>Найти</button>
    </aside>
  );
}

interface InputOrSelectProps {
  type?: "number" | "text";
  placeholder: string;
  value: string;
  options?: { label: string; value: string | number }[];
  onChange: (value: string) => void;
}

function InputOrSelect({ type, placeholder, value, options, onChange }: InputOrSelectProps) {
  return options ? (
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
