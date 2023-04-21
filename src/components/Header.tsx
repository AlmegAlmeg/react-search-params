import { Link } from 'react-router-dom';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  return (
    <header className="p-4 bg-sky-900 shadow-md">
      <nav className="flex justify-between max-w-6xl mx-auto items-center">
        <div className="logo text-sky-100 text-3xl font-bold">
          <Link to="/">SHAME</Link>
        </div>
        <HeaderSearch />
      </nav>
    </header>
  );
}
