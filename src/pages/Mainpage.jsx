import BookmarkList from "../components/BookmarkList";
import ProductList from "../components/Productlist";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mainpage() {
  const bookmark = JSON.parse(localStorage.getItem("bookmark"));
  const [bookmarkState, setBookmarkState] = useState(bookmark);
  const [showToast, setShowToast] = useState(true);

  return (
    <div>
        <div>
        <ToastContainer
          position="bottom-right"
          limit={5}
          closeButton={true}
          autoClose={3000}
        />
        </div>
      <ProductList
        bookmarkState={bookmarkState}
        setBookmarkState={setBookmarkState}
      />
      <BookmarkList
        bookmarkState={bookmarkState}
        setBookmarkState={setBookmarkState}
      />
    </div>
  );
}
export default Mainpage;