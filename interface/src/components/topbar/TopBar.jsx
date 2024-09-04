import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import "./topbar.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="top">
      <div className="topLeft gap-7">
      <Link className="flex items-center justify-center" to='/'>
          <img src={PF+"logo.jpeg"} className="h-15 w-20 object-fill rounded-full p-2" />
          <span className="sr-only">Blog App</span>
        </Link>

        <form className="topSearchIcon flex gap-1" onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          className=' lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/search">
          <i className="topSearchIcon fas fa-search"></i>
        </Link>
      </form>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">


        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<img src={PF + user.profilePic} className="h-[60px] w-[60px] object-cover rounded-full " />}
          >
            <Dropdown.Header>
              <span className="block text-sm p-1">@{user.username}</span>
              <span className="block text-sm font-medium truncate  p-1">
                {user.email}
              </span>
            </Dropdown.Header>

            <Link to={"/settings"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            {user.isAdmin && (
              <Link to="/dashboard">
                <Dropdown.Item>Admin Dashboard</Dropdown.Item>
              </Link>
            )}

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          // <Link to="/settings">
          //   <img className="topImg" src={PF+user.profilePic} alt="" />
          // </Link>
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
