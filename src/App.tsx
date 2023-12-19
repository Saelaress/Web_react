// App.tsx
import React, { useEffect, useState } from "react";
import MainAppBar from "./components/MainAppBar";
import { Post } from "./types";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import SetPostsContext from "./context/setPostsContext";
import Pagination from "./components/Pagination";

const POSTS_PER_PAGE = 10;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts !== null) {
      const parsedPosts = JSON.parse(savedPosts);

      if (Array.isArray(parsedPosts) && parsedPosts.length > 0) {
        setPosts(parsedPosts);
      }
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Request failed.");
        })
        .then((json) => {
          // Добавляем поле 'liked' со значением 'false'
          const postsWithLikedField = json.map((post: Post) => ({
            ...post,
            liked: false,
          }));

          setPosts(postsWithLikedField);
          localStorage.setItem("posts", JSON.stringify(postsWithLikedField));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleCheckboxChange = (postId: number) => {
    // Обновление состояния liked
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getPagePosts = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  };

  return (
    <SetPostsContext.Provider value={setPosts}>
      <MainAppBar />
      <AddPost />
      <PostList
        posts={getPagePosts()}
        onCheckboxChange={handleCheckboxChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / POSTS_PER_PAGE)}
        onPageChange={handlePageChange}
      />
    </SetPostsContext.Provider>
  );
}

export default App;
