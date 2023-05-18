import Item from "./Item";
import styles from "./ProductList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ bookmarkState, setBookmarkState }) {
  const [data, setData] = useState([]);
  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((i) => i.id === item.id);
    }
    return false;
  };
  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products?count=4", {
        method: "GET",
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return ( 
    <div className={styles.mainbox}>
      <h1 className={styles.title}>상품 리스트</h1>
      <div className={styles.listWrapper}>
        {data.map((item) => {
          return (
            <Item
              item={item}
              isBookmarked={checkIsBookmarked(item)}
              bookmarkState={bookmarkState}
              setBookmarkState={setBookmarkState}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
