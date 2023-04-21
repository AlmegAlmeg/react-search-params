import { FormEvent, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function HeaderSearch() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  let [_, setSearchParams] = useSearchParams('my search');

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchRef.current === null) return;

    setHasError(false);
    const { value: searchValue } = searchRef.current;

    if (searchValue.length < 2) {
      setHasError(true);
      return;
    }

    setSearchParams({ s: searchValue });
  }

  return (
    <form onSubmit={search} className="flex gap-4">
      <input
        ref={searchRef}
        type="text"
        className={`custom-input ${hasError && 'border-red-800 border-2'}`}
        placeholder="Type anything..."
      />
      <button type="submit" className="custom-btn">
        Search
      </button>
    </form>
  );
}
