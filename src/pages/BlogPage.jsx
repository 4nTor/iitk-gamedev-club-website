import { useEffect, useState } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { formatMarkdown } from '../utils/markdown';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch('/posts/index.json');
      const list = await response.json();

      const loadedPosts = await Promise.all(
        list.map(async (post) => {
          const markdown = await fetch(`/posts/${post.slug}.md`).then((res) => res.text());
          return { ...post, markdown };
        }),
      );

      setPosts(loadedPosts);
    };

    loadPosts().catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <SectionHeader title="JustInsights" subtitle="Thoughts, dev notes, postmortems, and club writeups from the Game Development Club." />
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <p className="text-sm text-accent">{post.date}</p>
            <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
            <div className="prose prose-invert mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: formatMarkdown(post.markdown) }} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;