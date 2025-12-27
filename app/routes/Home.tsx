import { Link } from 'react-router';
import { BrowserTitle } from '../components/BrowserTitle';
import RespImage from '../components/RespImage';
import { useFetch } from '../hooks/useFetch';
import type { Category } from '../types';

export default function HomePage() {
  const { data, loading, error } = useFetch<Category>('/patterns/index.json');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    if (error) console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <>
      <BrowserTitle />
      <div className="mb-8">
        <div className="mb-8">
          <p>
            Welcome to RetroStitcher, a collection of video game of yesteryear sprites turned into
            cross stitch patterns. I've created these patterns because I love the old video games of
            my youth, I love cross stitching, and I love long, tedious, and painful processes that
            one most go through in order to embark on a project like this.
          </p>
          <p className="mt-4">
            I share them here for your enjoyment. I hope you can make something awesome with them.
          </p>
        </div>
        <RespImage alt="" src="/divider.png" srcDark="/divider-white.png" className="h-3 mx-auto" />
      </div>

      {/* <ul className="ml-8 list-decimal">
        {data.items.map((item) => (
          <li key={`item-${item.title}`}>
            <Link to={`/system/${params.system}/${item.file.substr(0, item.file.indexOf('/'))}`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul> */}

      <h2 className="text-xl mb-4">Systems</h2>
      <ul className="ml-8 list-decimal">
        {data.items.map((system) => (
          <li key={`system-${system.title}`}>
            <Link to={`/system/${system.file.substr(0, system.file.indexOf('/'))}`}>
              {system.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
