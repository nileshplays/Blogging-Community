import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import React from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Sidebar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      {user && (
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img src={PF + user.profilePic} alt="" />
          <p>
            {user.username}
            <br></br>
            {user.email}
          </p>
        </div>
      )}
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList flex flex-wrap gap-4">
          {cats.map((c) => (
            <React.Fragment key={c._id}>
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
