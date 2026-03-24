import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="post-card">
      <span className="post-title">{post.title}</span>
    </Link>
  );
}
