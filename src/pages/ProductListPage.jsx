import Item from "../components/Item";
import Types from "../components/Categories";
import styles from "./ProductListPage.module.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductListPage({ bookmarkState, setBookmarkState }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [currentType, setCurrentType] = useState("all");
  const [itemsNumberByTypes, setItemsNumberByTypes] = useState({});
  const [endPage, setEndPage] = useState(0);

  const ITEMS_PER_PAGE = 12;
  const obsRef = useRef(null); 
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const preventRef = useRef(true);
  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };

  useEffect(() => {
    const count = {
      all: 0,
      Brand: 0,
      Category: 0,
      Product: 0,
      Exhibition: 0,
    };
    const getData = async () => {
      const response = await axios.get(
        "http://cozshopping.codestates-seb.link/api/v1/products"
      );
      setData(response.data);
      response.data.forEach((item) => {
        count["all"] += 1;
        count[item.type] += 1;
      });
      setItemsNumberByTypes(count);
    };
    getData();
    const observer = new IntersectionObserver(obsHandler, {
      threshold: 1.0,
    });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  /* 옵저버 생성 */
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    setEndPage(Math.ceil(itemsNumberByTypes[currentType] / ITEMS_PER_PAGE));
    setDisplayData(data.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, [data]);

  useEffect(() => {
    setEndPage(Math.ceil(itemsNumberByTypes[currentType] / ITEMS_PER_PAGE));
    setDisplayData(
      data
        .filter((item) =>
          currentType === "all" ? true : item.type === currentType
        )
        .slice(0, ITEMS_PER_PAGE)
    );
    setPage(1);
  }, [currentType]);

  useEffect(() => {
    console.log(page + "/" + endPage);
    if (page !== 1) getPost();
  }, [page]);

  let timer = null;
  const getPost = () => {
    setIsLoading(true);
    if (timer) {
      clearTimeout(timeoutRef.current);
    }
    timer = setTimeout(() => {
      setDisplayData((prev) => [
        ...prev,
        ...data
          .filter((item) =>
            currentType === "all" ? true : item.type === currentType
          )
          .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
      ]);
      preventRef.current = true;
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={styles.mainbox}>
      <ToastContainer
        position="bottom-right"
        limit={3}
        closeButton={true}
        autoClose={3000}
      />
      <Types currentType={currentType} setCurrentType={setCurrentType} />
      <div className={styles.itemBox}>
        {displayData.map((item) => (
          <Item
            item={item}
            isBookmarked={checkIsBookmarked(item)}
            bookmarkState={bookmarkState}
            setBookmarkState={setBookmarkState}
          />
        ))}
      </div>
      {isLoading && (
        <div className={styles.ldsring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div ref={obsRef}></div>
    </div>
  );
}

export default ProductListPage;
