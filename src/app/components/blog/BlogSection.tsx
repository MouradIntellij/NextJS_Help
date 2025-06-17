// import styles from './blogSection.module.css';
// import SearchBar from './SearchBar/SearchBar';
// import PostCard from './PostCard/PostCard';

// const mockPosts = [
//   { title: 'Post Example 1' },
//   { title: 'Post Example 2' },
//   { title: 'Post Example 3' },
//   { title: 'Post Example 4' },
//   { title: 'Post Example 5' },
//   { title: 'Post Example 6' },
//   { title: 'Post Example 7' },
// ];

// export default function BlogSection() {
//   return (
//     <section className={styles.blogSection}>
//       <SearchBar />
//       <h2 className={styles.heading}>Recent posts</h2>
//       <div className={styles.grid}>
//         {mockPosts.map((post, index) => (
//           <PostCard key={index} title={post.title} />
//         ))}
//       </div>
//     </section>
//   );
// }

'use client'

import { useState } from 'react';
import styles from './blogSection.module.css';
import SearchBar from './SearchBar/SearchBar';
import PostCard from './PostCard/PostCard';

const mockPosts = [
  { title: 'React Hooks', tags: ['React'] },
  { title: 'Styling with CSS Modules', tags: ['CSS'] },
  { title: 'JavaScript Tips', tags: ['JavaScript'] },
  { title: 'TypeScript Basics', tags: ['TypeScript'] },
  { title: 'Responsive Design', tags: ['CSS', 'UX'] },
  { title: 'Next.js Routing', tags: ['React', 'Next.js'] },
];

const wordCloud = ['React', 'JavaScript', 'CSS', 'TypeScript', 'Next.js', 'UX'];

export default function BlogSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // blogs = [] ;
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = selectedTags.length
    ? mockPosts.filter(post => post.tags.some(tag => selectedTags.includes(tag)))
    : mockPosts;

  return (
    // blogs = NXTGS.EXECUTE(localhos:3000/blogs) as object ;
    // debug("We have loaded "+blogs.length);
    // debug(blogs[0][`title`]);
    
    <section className={styles.blogSection}>
      <div className={styles.topBar}>
        <SearchBar />
        <div className={styles.wordCloud}>
          {wordCloud.map(tag => (
            <button
              key={tag}
              className={`${styles.word} ${
                selectedTags.includes(tag) ? styles.active : ''
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <h2 className={styles.heading}>Recent posts</h2>

      <div className={styles.grid}>
        {filteredPosts.map((post, index) => (
          <PostCard key={index} title={post.title} />
        ))}
      </div>
    </section>
  );
}
