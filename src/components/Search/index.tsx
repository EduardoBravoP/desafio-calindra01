import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<Data>();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSuggestionShown, setIsSuggestionShown] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e: MouseEvent) {
    const { current: container } = containerRef;

    if (container && !container.contains(e.target as Node)) {
      setIsSuggestionShown(false);
    }
  }

  function handleSearch(e?: FormEvent) {
    e?.preventDefault();

    setIsSuggestionShown(false);
    setProducts(data?.products);
  }

  async function handleSearchValueChange(value: string) {
    setSearchValue(value);

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

  async function handleSearchWithSuggestion(suggestion: string) {
    setSearchValue(suggestion);
    setIsSuggestionShown(false);

    const response = await api.get<Data>(
      `/autocomplete?content=${suggestion}&source=nanook`
    );

    setSuggestions(response.data.suggestions);
    setData(response.data);
    setProducts(response.data.products);
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <form className={styles.input} onSubmit={handleSearch}>
        <input
          placeholder="Buscar produtos..."
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchValueChange(e.target.value)}
          onFocus={() => setIsSuggestionShown(true)}
        />
        <button type="submit">
          <FiSearch size={20} color="#BBB" />
        </button>
      </form>

      {isSuggestionShown && suggestions[0] && (
        <div className={styles.autoComplete}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.term}
              onClick={() => handleSearchWithSuggestion(suggestion.term)}
            >
              <FiSearch size={20} color="#560BAD" />
              <p>{suggestion.term}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
