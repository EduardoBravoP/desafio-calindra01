import { FiBarChart, FiEye } from "react-icons/fi";

import styles from "./styles.module.scss";

interface ProductProps {
  name: string;
  score: number;
  clicksCount: string;
}

export default function Product({ name, score, clicksCount }: ProductProps) {
  return (
    <div className={styles.container}>
      <h3>{name}</h3>

      <div className={styles.footer}>
        <div>
          <FiBarChart size={20} color="#560BAD" />
          <span>{score}</span>
        </div>

        <div>
          <FiEye size={20} color="#560BAD" />
          <span className={styles.eye}>{clicksCount}</span>
        </div>
      </div>
    </div>
  );
}
