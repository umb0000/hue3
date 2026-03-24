import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import PostCard from '../components/PostCard';
import { samplePosts } from '../sampleData';

export default function Home() {
  const [posts, setPosts] = useState(samplePosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setPosts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch (e) {
        console.log('Firestore not available, using sample data');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
