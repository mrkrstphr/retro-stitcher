import { Link } from 'react-router';
import { BrowserTitle } from '~/components/BrowserTitle';
import { useFetch } from '~/hooks/useFetch';
import type { Category } from '~/types';
import type { Route } from './+types/Game';

export default function GamePage({ params }: Route.ComponentProps) {
  const {
    data: system,
    loading: systemLoading,
    error: systemError,
  } = useFetch<Category>(`/patterns/${params.system}/index.json`);
  const { data, loading, error } = useFetch<Category>(
    `/patterns/${params.system}/${params.game}/index.json`,
  );

  if (loading || systemLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data || systemError || !system) {
    if (error) console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <>
      <BrowserTitle title={data.title} />
      <div>
        <h2 className="text-2xl">{data.title}</h2>
        <div className="text-slate-600 dark:text-slate-400 mb-4">
          System: <Link to={`/system/${params.system}`}>{system.title}</Link>
        </div>

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
    </>
  );
}
