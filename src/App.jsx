import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useHref } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';
import { ColorProvider } from './components/ColorContext';
import PatternPage from './components/PatternPage';
import RespImage from './components/RespImage';
import SpriteSheet from './components/SpriteSheet';

function Index() {
  const [patterns, setPatterns] = useState();
  const patternId = useHref();

  const patternFile = patternId === '/' ? '/patterns/index.json' : `${patternId}.json`;

  useEffect(() => {
    setPatterns(undefined);

    fetch(patternFile)
      .then((data) => data.json())
      .then(setPatterns);
  }, [patternFile]);

  if (!patterns) return null;

  switch (patterns.type) {
    case 'category':
      return <CategoryPage details={patterns} />;
    case 'spritesheet':
      return <SpriteSheet details={patterns} />;
    default:
      return <PatternPage file={patternFile} />;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <ColorProvider>
        <div className="m-8">
          <Link to="/">
            <RespImage
              alt="Retro Stitcher"
              src="/logo.png"
              srcDark="/logo-white.png"
              className="h-12"
            />
          </Link>

          <div className="mt-8">
            <Routes>
              <Route path="*" element={<Index />} />
            </Routes>
          </div>
        </div>
      </ColorProvider>
    </BrowserRouter>
  );
}
