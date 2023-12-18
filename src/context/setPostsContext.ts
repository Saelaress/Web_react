import { createContext } from "react";
import { Post } from "../types";

const SetPostsContext = createContext<React.Dispatch<React.SetStateAction<Post[]>> | null>(null);

export default SetPostsContext;