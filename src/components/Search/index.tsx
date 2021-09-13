import { FiSearch } from "react-icons/fi";

import styles from "./styles.module.scss";

export default function Search() {
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input placeholder="Buscar produtos..." type="text" />
        <button>
          <FiSearch size={20} color="#BBB" />
        </button>
      </div>

      <div className={styles.autoComplete}>
        <div>
          <FiSearch size={20} color="#560BAD" />
          <p>air fryer</p>
        </div>

        <div>
          <FiSearch size={20} color="#560BAD" />
          <p>celular motorola moto g 30</p>
        </div>

        <div>
          <FiSearch size={20} color="#560BAD" />
          <p>ar condicionado</p>
        </div>

        <div>
          <FiSearch size={20} color="#560BAD" />
          <p>bicicleta aro 29</p>
        </div>

        <div>
          <FiSearch size={20} color="#560BAD" />
          <p>a32</p>
        </div>

        <div>
          <FiSearch size={20} color="#560BAD" />
          <p>fritadeira airfryer</p>
        </div>
      </div>
    </div>
  );
}
