/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MaingPage = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios.get("http://3.36.66.225:3000/board/getBoard").then(function (res) {
      setBoard(res.data);
    });
  }, []);

  let title = [];
  title = board.map((x) => {
    return {
      id: x.id,
      title: x.title,
      content: x.content,
    };
  });

  // 현재 페이지 번호와 페이지 당 항목 수 상태  설정
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지 당 항목 수 설정

  // 현재 페이지의 항목 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = title.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 시 실행할 함수
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const navigate = useNavigate();
  const handlePageChage = () => {
    navigate("/wikipage");
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-container-title">
          <h2>메인 페이지</h2>
          <button type="submit" onClick={handlePageChage}>
            추가
          </button>
        </div>
        <div style={{ height: "500px" }}>
          <ul style={{ height: "100%", marginTop: "1rem" }}>
            {currentItems.map((el, index) => {
              return (
                <div key={index} style={{ width: "100px", height: "50px" }}>
                  <Link to="/wikiPage" state={{ data: el }}>
                    <li>{el.title}</li>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        {/* 페이지네이션 */}
        <Pagination
          totalItems={title.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default MaingPage;
