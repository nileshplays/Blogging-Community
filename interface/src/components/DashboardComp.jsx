import { useEffect, useState } from "react";
import { Context } from "../context/Context";
import { useContext } from "react";
import axios from "axios";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText, 
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DashboardComp() {
  const location = useLocation();
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const { currentUser } = { user };
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users/");

        setUsers(res.data.users);
        setTotalUsers(res.data.totalUsers);
        setLastMonthUsers(res.data.lastMonthUsers);
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts/");
        setPosts(res.data.posts);
        setTotalPosts(res.data.totalPosts);
        setLastMonthPosts(res.data.lastMonthPosts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
    fetchPosts();
    console.log(users);
    console.log(posts);
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    User image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
              {users.length > 0 &&
              users.map((u) => (
                  <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td>
                      <img
                        src={PF + u.profilePic}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </td>
                    <td>{u.username}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Post image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Post title
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Post Categories
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Post User
                  </th>
                </tr>
              </thead>
              <tbody>
              {posts.length > 0 &&
              posts.map((p) => (
                  <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td>
                      <img
                        src={PF + p.photo}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </td>
                    <Link to={`/post/${p._id}`} className="link">
                    <td>{p.title}</td>
                    </Link>
                    <td>{p.categories}</td>
                    <td>{p.username}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
