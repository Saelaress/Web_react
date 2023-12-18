// App.tsx
import React, { useEffect, useState } from "react";
import MainAppBar from "./components/MainAppBar";
import { Post } from "./types";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import SetPostsContext from "./context/setPostsContext";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
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
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
          };
        }
        return post;
      });

      // Обновляем в localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      return updatedPosts;
    });
  };

  return (
    <SetPostsContext.Provider value={setPosts}>
      <MainAppBar />
      <AddPost />
      <PostList posts={posts} onCheckboxChange={handleCheckboxChange} />
    </SetPostsContext.Provider>
  );
}

export default App;
