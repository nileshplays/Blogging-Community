import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { MuiChipsInput } from "mui-chips-input";
import { Context } from "../../context/Context";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Write() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function htmlToText(html) {
    return {
      text: html.replace(/<[^>]+>/g, ""),
    };
  }

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [chips, setChips] = useState([]);

  const handleChange = (newChips) => {
    setChips(newChips);
  };

  // useEffect(()=>{
  //   let html = convertToHTML(editorState.getCurrentContent());
  //   setDesc(htmlToText(html));

  //   let content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  //   console.log(html);
  //   console.log(content);
  // }, [editorState])


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let html = convertToHTML(editorState.getCurrentContent());
    setDesc(html);

    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: chips,
      content: content,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
      console.log(res);
    } catch (err) {}

    console.log(newPost);
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <MuiChipsInput
            className="writeInput"
            placeholder="Blog is about? (Categories)"
            value={chips}
            onChange={handleChange}
            addOnBlur
            hideClearAll
          />
        </div>
        <div className="writeFormGroup writeInput">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
      
    </div>
  );
}
