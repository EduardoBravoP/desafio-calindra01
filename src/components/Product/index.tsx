import { FiBarChart, FiEye } from "react-icons/fi";

import styles from "./styles.module.scss";

export default function Product() {
  return (
    <div className={styles.container}>
      <h3>
        Smartphone Motorola Moto G30 128GB 4G Wi-Fi Tela 6.5 Dual Chip 4GB RAM
        Câmera Quádrupla + Selfie 13MP - Dark Prism
      </h3>

      <div className={styles.footer}>
        <div>
          <FiBarChart size={20} color="#560BAD" />
          <span>100.000</span>
        </div>

        <div>
          <FiEye size={20} color="#560BAD" />
          <span className={styles.eye}>7482</span>
        </div>
      </div>
    </div>
  );
}
