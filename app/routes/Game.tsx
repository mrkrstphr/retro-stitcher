import { Link } from 'react-router';
import type { Category } from '~/types';
import { useFetch } from '../hooks/useFetch';
import type { Route } from './+types/Game';

export default function GamePage({ params }: Route.ComponentProps) {
  const { data, loading, error } = useFetch<Category>(
    `/patterns/${params.system}/${params.game}/index.json`,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    if (error) console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">{data.title}</h2>

      <ul className="ml-8 list-decimal">
        {data.items.map((item) => (
          <li key={`item-${item.title}`}>
            <Link
              to={`/system/${params.system}/${params.game}/${item.file.substr(0, item.file.indexOf('/'))}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
