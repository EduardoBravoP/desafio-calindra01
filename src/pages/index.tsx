import type { NextPage } from "next";
import { useState } from "react";
import Product from "../components/Product";
import Search from "../components/Search";

import styles from "../styles/pages/index.module.scss";

interface Product {
  _meta: {
    score: number;
    visitsClickCount: string;
  };
  name: string;
  id: string;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  return (
    <div className={styles.container}>
      <header>
        <Search setProducts={setProducts} />
      </header>

      <main>
        <h1>Produtos</h1>
        <div className={styles.list}>
          {products ? (
            products.map((product) => (
              <Product
                key={product.id}
                name={product.name}
                score={product._meta.score}
                clicksCount={product._meta.visitsClickCount}
              />
            ))
          ) : (
            <p>Busque por produtos</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
