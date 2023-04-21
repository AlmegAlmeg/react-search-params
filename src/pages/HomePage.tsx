import { useSearchParams } from 'react-router-dom';
import SearchPage from './SearchPage';

export default function HomePage() {
  const [searchParams] = useSearchParams();

  const param = searchParams.get('s');

  if (param !== null && param !== '') {
    return <SearchPage searchParam={param} />;
  }

  return <div>HomePage</div>;
}
