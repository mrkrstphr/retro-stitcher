import ColorDisclaimer from '../components/ColorDisclaimer';
import PatternLoader from '../components/PatternLoader';
import { useFetch } from '../hooks/useFetch';
import type { Sheet } from '../types';
import type { Route } from './+types/Patterns';

export default function GamePage({ params }: Route.ComponentProps) {
  const url = `/patterns/${params.system}/${params.game}/${params.pattern}/index.json`;
  const { data, loading, error } = useFetch<Sheet>(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    if (error) console.error(error);
    return <div>Error loading data</div>;
  }

  const maxPerRow = data.maxPerRow ?? 3;

  const classes =
    maxPerRow === 2
      ? 'grid grid-cols-1 lg:grid-cols-2 gap-4'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  return (
    <div>
      <h2 className="text-2xl">{data.title}</h2>

      <div className={classes}>
        {data.patterns.map((pattern, index) => (
          <PatternLoader
            className={`mr-2 mt-2 h-full`}
            file={`${url.replace(`/index.json`, '')}/${pattern}`}
            key={`pattern-${pattern}`}
            style={{
              pageBreakAfter: index < data.patterns.length - 1 ? 'always' : 'auto',
              pageBreakBefore: index > 0 ? 'always' : 'auto',
            }}
          />
        ))}
      </div>

      <ColorDisclaimer className="mt-8" />
    </div>
  );
}
