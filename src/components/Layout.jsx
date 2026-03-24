import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link to="/" className="logo">휴...=3</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
