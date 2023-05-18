import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import logo from "../assets/img_log.png";
import { Link } from "react-router-dom";

function Header(prop) {
  const handleDropdown = () => {
    prop.setShowDropdown(!prop.showDropdown);
  };
  return (
    <header className={styles.header}>
      {" "}
      <Link to="/">
        <div className={styles.wrapper}>
          <img className={styles.logo} src={logo}></img>{" "}
          <span className={styles.title}>COZ Shopping</span>{" "}
        </div>{" "}
      </Link>
      <span className={styles.button}></span>
      <FontAwesomeIcon
        onClick={handleDropdown}
        className={styles.button}
        size="2x"
        icon={faBars}
      />
    </header>
  );
}
export default Header;