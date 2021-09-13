import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

interface Product {
  _meta: {
    score: number;
    visitsClickCount: string;
  };
  name: string;
  id: string;
}

interface Suggestion {
  term: string;
}

interface Data {
  products: Product[];
  suggestions: Suggestion[];
}

interface SearchProps {
  setProducts: Dispatch<SetStateAction<Product[] | undefined>>;
}

export default function Search({ setProducts }: SearchProps) {
  const [data, setData] = useState<Data>();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSuggestionShown, setIsSuggestionShown] = useState(false);

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    setProducts(data?.products);
  }

  async function handleSearchValueChange(value: string) {
    if (!value.trim()) {
      setIsSuggestionShown(false);
      setSuggestions([]);

      return;
    }

    setIsSuggestionShown(true);

    const response = await api.get<Data>(
      `/autocomplete?content=${value}&source=nanook`
    );

    setSuggestions(response.data.suggestions);
    setData(response.data);
  }

  return (
    <div className={styles.container}>
      <form className={styles.input} onSubmit={handleSearch}>
        <input
          placeholder="Buscar produtos..."
          type="text"
          onChange={(e) => handleSearchValueChange(e.target.value)}
          onBlur={() => setIsSuggestionShown(false)}
          onFocus={() => setIsSuggestionShown(true)}
        />
        <button type="submit">
          <FiSearch size={20} color="#BBB" />
        </button>
      </form>

      {isSuggestionShown && suggestions[0] && (
        <div className={styles.autoComplete}>
          {suggestions.map((suggestion) => (
            <div key={suggestion.term}>
              <FiSearch size={20} color="#560BAD" />
              <p>{suggestion.term}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
