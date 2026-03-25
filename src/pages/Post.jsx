import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { marked } from 'marked';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', id));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        console.log('Firestore not available');
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="post-page">
        <Link to="/" className="back-link">← 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="post-page">
      <h1 className="post-page-title">{post.title}</h1>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: marked(post.content || '') }}
      />
      <Link to="/" className="back-link">← 돌아가기</Link>
    </div>
  );
}
