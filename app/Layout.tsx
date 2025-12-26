import { Link, Outlet } from 'react-router';
import RespImage from './components/RespImage';

export default function Layout() {
  return (
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
        <Outlet />
      </div>
    </div>
  );
}
