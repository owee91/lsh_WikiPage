const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test_db",
  password: "admin",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getBoard = async () => {
  const promisePool = pool.promise();
  const [rows] = await promisePool.query(
    "select * from tb_board order by id desc"
  );
  return rows;
};

const postBoard = async (req) => {
  const promisePool = pool.promise();
  const [rows] = await promisePool.query(
    `insert into tb_board(title, content) values('${req.body.title}', '${req.body.content}')`
  );
  return rows;
};

const putBoard = async (req) => {
  const promisePool = pool.promise();
  const [rows] = await promisePool.query(
    `update tb_board set title = '${req.body.title}', content = '${req.body.content}' where id = ${req.body.id}`
  );
  return rows;
};

module.exports = {
  getBoard,
  postBoard,
  putBoard,
};
