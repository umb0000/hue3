import PostCard from '../components/PostCard';
import SpinningObject from '../components/SpinningObject';
import { samplePosts } from '../sampleData';

export default function Home() {
  const posts = samplePosts;

  return (
    <div className="home">
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="home-3d">
        <SpinningObject width={350} height={550} />
      </div>
    </div>
  );
}
