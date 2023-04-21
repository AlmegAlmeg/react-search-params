import { useEffect, useState } from 'react';
import { Product } from '../model/product';

type SearchPageProps = { searchParam: string };

export default function SearchPage({ searchParam }: SearchPageProps) {
  const [results, setResults] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fixedParam = searchParam.toLowerCase();

    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false);
        setResults(() =>
          response.filter((item: Product) => {
            return item.title.toLowerCase().includes(fixedParam);
          })
        );
      });
  }, [searchParam]);

  return (
    <div className="mt-4">
      <h1 className="text-center text-3xl underline">Showing results for "{searchParam}"</h1>

      <div className="content mt-8">
        {/* Loading state */}
        {isLoading && <div className="text-center text-2xl">Loading results...</div>}

        {/* Results */}

        {results !== null &&
          (results.length === 0 ? (
            <p>No results found for "{searchParam}"</p>
          ) : (
            results.map((prod) => {
              return <div key={prod.id}>{prod.title}</div>;
            })
          ))}
      </div>
    </div>
  );
}
