/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WikiPage = () => {
  const location = useLocation();
  const data = location.state?.data;
  let dataId = "";
  let dataTitle = "";
  let dataContent = "";
  let flag = false;
  if (data) {
    flag = true;
    dataId = data.id;
    dataTitle = data.title;
    dataContent = data.content;
  } else {
    flag = false;
  }
  const [id, setId] = useState(dataId);
  const [title, setTitle] = useState(dataTitle);
  const [content, setContent] = useState(dataContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    if (flag) {
      axios
        .put("http://3.36.69.233:3000/board/putBoard", {
          id: id,
          title: title,
          content: content,
        })
        .then(function (res) {
          handlePageChage();
        });
    } else {
      axios
        .post("http://3.36.69.233:3000/board/postBoard", {
          title: title,
          content: content,
        })
        .then(function (res) {
          handlePageChage();
        });
    }
    setId("");
    setTitle("");
    setContent("");
  };
  const navigate = useNavigate();
  const handlePageChage = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <div className="form-container-title">
        <h2>WikiPage</h2>
        <button type="submit" onClick={handleSubmit}>
          {flag ? "수정" : "저장"}
        </button>
      </div>
      <form>
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
