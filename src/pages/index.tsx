import type { NextPage } from "next";
import Product from "../components/Product";
import Search from "../components/Search";

import styles from "../styles/pages/index.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <Search />
      </header>

      <main>
        <h1>Produtos</h1>
        <div className={styles.list}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </main>
    </div>
  );
};

export default Home;
