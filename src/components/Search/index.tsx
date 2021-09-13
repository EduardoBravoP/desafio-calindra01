import { FiSearch } from "react-icons/fi";

import styles from "./styles.module.scss";

export default function Search() {
  return (
    <div className={styles.container}>
      <input placeholder="Buscar produtos..." type="text" />
      <button>
        <FiSearch size={20} color="#BBB" />
      </button>
    </div>
  );
}
