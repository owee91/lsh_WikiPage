/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const WikiPage = () => {
  const location = useLocation();
  const { data, board } = location.state || {};
  let [id, setId] = useState(data?.id || "");
  let [title, setTitle] = useState(data?.title || "");
  let [content, setContent] = useState(data?.content || "");

  const currentPageTitle = location.state?.data?.title || "";
  let [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      if (data) {
        await axios.put("http://3.36.66.225:3000/board/putBoard", {
          id,
          title,
          content,
        });
      } else {
        await axios.post("http://3.36.66.225:3000/board/postBoard", {
          title,
          content,
        });
      }
      setId("");
      setTitle("");
      setContent("");
      handleHomeMove();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();
  const handleHomeMove = () => {
    navigate("/");
  };
  const handlePageChange = (param) => {
    setId(param.id);
    setTitle(param.title);
    setContent(param.content);
  };

  const processContent = (content) => {
    const words = content.split(" ");
    const processedContent = [];
    words.forEach((word, index) => {
      const matched = board.find(
        (item) => item.title === word && word !== currentPageTitle
      );
      if (matched) {
        processedContent.push(
          <a
            style={{ cursor: "pointer" }}
            key={matched.id}
            onClick={() => handlePageChange(matched)}
          >
            {word}
          </a>
        );
      } else {
        processedContent.push(word);
      }

      if (index < words.length - 1) {
        processedContent.push(" ");
      }
    });
    return processedContent;
  };
  const handleTextChange = () => {
    setFlag(true);
  };

  return (
    <div className="form-container">
      <div className="form-container-title">
        <h2>WikiPage</h2>
        <div style={{ display: "flex" }}>
          <button
            style={{ marginRight: "5px" }}
            type="submit"
            onClick={handleHomeMove}
          >
            홈
          </button>
          {data ? (
            flag ? (
              <button type="submit" onClick={handleSubmit}>
                저장
              </button>
            ) : (
              <button type="submit" onClick={handleTextChange}>
                수정
              </button>
            )
          ) : (
            <button type="submit" onClick={handleSubmit}>
              저장
            </button>
          )}
        </div>
      </div>
      <form>
        {data ? (
          flag ? (
            <div>
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
            </div>
          ) : (
            <div>
              <div className="div-title">{title}</div>
              <div className="div-content">
                {data ? processContent(content) : ""}
              </div>
            </div>
          )
        ) : (
          <div>
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
          </div>
        )}
      </form>
    </div>
  );
};

export default WikiPage;
