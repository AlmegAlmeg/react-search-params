import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function HeaderSearch() {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const searches = localStorage.getItem('recent-search');
    if (searches === null) return [];

    return JSON.parse(searches);
  });

  const searchRef = useRef<HTMLInputElement>(null);
  let [_, setSearchParams] = useSearchParams('my search');

  useEffect(() => {
    document.addEventListener('click', onOutsideClick);

    return () => {
      document.removeEventListener('click', onOutsideClick);
    };
  }, []);

  function onOutsideClick(event: MouseEvent) {
    if (recentSearches.length === 0) return;
    if (searchRef.current === null) return;
    if (searchRef.current.contains(event.target as Node)) return;

    setIsDropdownOpen(false);
  }

  /**
   * Searching from form submit.
   *
   * @param e Form event
   */
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
    setRecentSearches((prevValue) => {
      let newSearches = [searchValue.toLowerCase(), ...prevValue];

      if (newSearches.length > 5) {
        newSearches = newSearches.slice(0, 5);
      }

      localStorage.setItem('recent-search', JSON.stringify(newSearches));
      return newSearches;
    });

    searchRef.current.value = '';
    setIsDropdownOpen(false);
  }

  /**
   * Handling user clicked on
   * recent search.
   *
   * @param search
   */
  function handleRecentSearch(search: string) {
    setIsDropdownOpen(false);
    setSearchParams({ s: search.toLocaleLowerCase() });
  }

  function deleteRecentSearched() {
    setRecentSearches([]);
    localStorage.removeItem('recent-search');
  }

  return (
    <form className="flex gap-4" onSubmit={search}>
      <div className="relative">
        {/* Search input */}
        <input
          ref={searchRef}
          type="text"
          onClick={() => setIsDropdownOpen((val) => !val)}
          className={`custom-input ${hasError && 'border-red-800 border-2'}`}
          placeholder="Type anything..."
        />

        {/* Recent searches */}
        {isDropdownOpen && recentSearches.length !== 0 && (
          <div className="absolute bg-white w-full p-2 border-2">
            {/* Reset recent searches */}

            {/* Searches */}
            {recentSearches.map((search, i) => (
              <div
                key={i}
                className="cursor-pointer hover:bg-sky-100"
                onClick={() => handleRecentSearch(search)}>
                {search}
              </div>
            ))}
            <span
              className="text-gray-400 float-right pt-2 cursor-pointer"
              onClick={deleteRecentSearched}>
              Clear recent searches
            </span>
          </div>
        )}
      </div>

      <button type="submit" className="custom-btn">
        Search
      </button>
    </form>
  );
}
