import ReactPaginate from "react-paginate";
import "../styles/pagination.scss";
import { useNobelStore } from "../store/useNobelStore";
import { useLaureatesStore } from "../store/useLaureatesStore";

const ITEMS_PER_PAGE = 25;

interface PaginationProps {
  isAwardPage: boolean;
}

export default function Pagination({ isAwardPage }: PaginationProps) {
  const { changePage, maxItems } = useNobelStore();
  const { changeLaureatePage, maxLaureateItems } = useLaureatesStore();

  const TOTAL_PAGES = Math.ceil((isAwardPage ? maxItems : maxLaureateItems) / ITEMS_PER_PAGE);

  // Унифицированная функция для изменения страницы
  const handlePageChange = (newOffset: string) => {
    if (isAwardPage) {
      changePage(newOffset);
    } else {
      changeLaureatePage(newOffset);
    }
  };

  // Обработчик события смены страницы
  const handlePageClick = (page: { selected: number }) => {
    const newOffset = (page.selected * ITEMS_PER_PAGE).toString();
    handlePageChange(newOffset);
  };

  return (
    <ReactPaginate
      pageCount={TOTAL_PAGES}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName="paginate-container"
      pageLinkClassName="paginate-link"
      activeClassName="paginate-active"
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
    />
  );
}
