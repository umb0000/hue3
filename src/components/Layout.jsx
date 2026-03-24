import { Link, useLocation } from 'react-router-dom';
import SpinningObject from './SpinningObject';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="layout">
      <header>
        <Link to="/" className="logo">휴......=3</Link>
      </header>
      <main>{children}</main>
      <div className="global-3d" style={{ opacity: isHome ? 1 : 0.5 }}>
        <SpinningObject width="100vw" height="100vh" />
      </div>
    </div>
  );
}
