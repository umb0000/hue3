import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { samplePosts } from '../sampleData';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(samplePosts.find((p) => p.id === id) || null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', id));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        console.log('Firestore not available, using sample data');
      }
    };
    fetchPost();
  }, [id]);

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
      <h1 className="post-page-title">{post.title}</h1>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <Link to="/" className="back-link">← 돌아가기</Link>
    </div>
  );
}
