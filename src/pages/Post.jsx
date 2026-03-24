import { useParams, Link } from 'react-router-dom';
import SpinningObject from '../components/SpinningObject';
import { samplePosts } from '../sampleData';

export default function Post() {
  const { id } = useParams();
  const post = samplePosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="post-page">
        <p>글을 찾을 수 없습니다.</p>
        <Link to="/">← 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="post-hero">
        <SpinningObject size={300} />
      </div>
      <h1 className="post-page-title">{post.title}</h1>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <Link to="/" className="back-link">← 돌아가기</Link>
    </div>
  );
}
