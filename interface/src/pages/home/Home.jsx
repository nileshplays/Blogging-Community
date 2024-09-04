import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data.posts);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
        <div className="flex flex-wrap gap-4 mt-8">
          <Posts posts={posts} />
          <Sidebar />
        </div>
    </>
  );
}
