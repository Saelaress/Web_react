import { useContext } from "react";
import SetPostsContext from "../context/setPostsContext";

const useSetPosts = () => useContext(SetPostsContext)

export default useSetPosts