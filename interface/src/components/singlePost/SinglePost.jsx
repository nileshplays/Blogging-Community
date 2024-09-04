import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MuiChipsInput } from "mui-chips-input";

export default function SinglePost() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  function htmlToText(html) {
    return {
      text: html.replace(/<[^>]+>/g, ""),
    };
  }

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";

  const [chips, setChips] = useState([]);
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(htmlToText(res.data.desc));
      setChips(res.data.categories);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(res.data.content))
        )
      );
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { user: user },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      let html = convertToHTML(editorState.getCurrentContent());
      setDesc(html);

      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );

      await axios.put(`/posts/${post._id}`, {
        user: user,
        title,
        desc,
        content,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  const handleChange = (newChips) => {
    setChips(newChips);
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {(post.username === user?.username || user?.isAdmin) && (
              <div className="singlePostEdit">
                {post.username === user?.username && (
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                )}
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <MuiChipsInput
            placeholder="Add or delete categories..."
            value={chips}
            onChange={handleChange}
            addOnBlur
            hideClearAll
          />
        ) : (
          <div className="postCats">
            {chips.map((c) => (
              <span key={chips.indexOf(c)} className="postCat">
                {c}
              </span>
            ))}
          </div>
        )}

        {updateMode ? (
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        ) : (
          <Editor
            readOnly
            toolbarHidden
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
