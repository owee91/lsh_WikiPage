const express = require("express");
const userDBC = require("./boardDBC");
const router = express.Router();

router.get("/getBoard", async (req, res) => {
  let res_get_users = {
    status_code: 500,
    users: [],
  };
  var result = "";

  try {
    const rows = await userDBC.getBoard();
    res_get_users.status_code = 200;
    result = rows;
  } catch (error) {
    console.log(error.message);
  } finally {
    res.send(result);
  }
});

router.post("/postBoard", async (req, res) => {
  let res_get_users = {
    status_code: 500,
    users: [],
  };
  var result = "";

  try {
    const rows = await userDBC.postBoard(req);
    res_get_users.status_code = 200;
    result = rows;
  } catch (error) {
    console.log(error.message);
  } finally {
    res.send(result);
  }
});

router.put("/putBoard", async (req, res) => {
  let res_get_users = {
    status_code: 500,
    users: [],
  };
  var result = "";

  try {
    const rows = await userDBC.putBoard(req);
    res_get_users.status_code = 200;
    result = rows;
  } catch (error) {
    console.log(error.message);
  } finally {
    res.send(result);
  }
});

module.exports = router;
