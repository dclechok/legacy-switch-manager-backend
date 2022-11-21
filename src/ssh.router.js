const router = require("express").Router();
const { CHANGENAME } = require("./ssh.controller");

router.route("/").post(CHANGENAME);


module.exports = router;