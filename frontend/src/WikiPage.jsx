/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const WikiPage = () => {
  const location = useLocation();
  const data = location.state?.data;
  let dataTitle = "";
  let dataContent = "";
  let flag = false;
  if (data) {
    flag = true;
    dataTitle = data.title;
    dataContent = data.content;
  } else {
    flag = false;
  }
  const [title, setTitle] = useState(dataTitle);
  const [content, setContent] = useState(dataContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    // onAddPost({ title, content });
    // setTitle("");
    // setContent("");
  };

  return (
    <div className="form-container">
      <div className="form-container-title">
        <h2>WikiPage</h2>
        <button type="submit">{flag ? "수정" : "저장"}</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default WikiPage;
