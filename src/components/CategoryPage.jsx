import { useHref } from 'react-router';
import { Link } from 'react-router-dom';
import RespImage from './RespImage';

function getNextFileUrl(currentHref, fileName) {
  const baseHref = (currentHref === '/' ? '/patterns' : currentHref).replace('/index', '');
  const newPath = fileName.replace('.json', '');

  return `${baseHref}/${newPath}`;
}

function Welcome() {
  return (
    <div className="mb-8">
      <div className="mb-8">
        <p>
          Welcome to RetroStitcher, a collection of video game of yesteryear sprites turned into
          cross stitch patterns. I've created these patterns because I love the old video games of
          my youth, I love cross stitching, and I love long, tedius, and painful processes that one
          most go through in order to embark on a project like this.
        </p>
        <p className="mt-4">
          I share them here for your enjoyment. I hope you can make something awesome with them.
        </p>
      </div>
      <RespImage alt="" src="/divider.png" srcDark="/divider-white.png" className="h-3 mx-auto" />
    </div>
  );
}

export default function CategoryPage({ details }) {
  const currentHref = useHref();

  return (
    <div>
      {currentHref === '/' && <Welcome />}

      <h2 className="text-2xl mb-4">{details.title}</h2>

      <ul className="ml-8 list-decimal">
        {details.items.map((item) => (
          <li key={`item-${item.title}`}>
            <Link to={getNextFileUrl(currentHref, item.file)}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
