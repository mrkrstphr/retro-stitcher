import { Link } from 'react-router';
import { BrowserTitle } from '~/components/BrowserTitle';
import { BASE_PATH } from '~/config';
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

        <div className="flex flex-wrap items-center gap-4">
          {data.items.map((item) => (
            <Link
              to={`/system/${params.system}/${params.game}/${item.file.substr(0, item.file.indexOf('/'))}`}
            >
              <div
                key={`item-${item.title}`}
                className="bg-slate-200 dark:bg-slate-800 rounded w-48 p-2"
              >
                {item.render ? (
                  <img
                    src={`${BASE_PATH}/${item.render}`}
                    alt={item.title}
                    className="inline-block size-48 object-contain rounded-tl rounded-tr"
                  />
                ) : (
                  item.title
                )}
                <div className="">
                  <h4>{item.title}</h4>
                  {/* <p className="text-sm mt-1 text-slate-700 dark:text-slate-400">X patterns</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
