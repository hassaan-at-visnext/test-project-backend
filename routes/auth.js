var express = require('express');
var router = express.Router();

const AuthContoller = require("../app/auth/AuthController");
const AUTH_ROUTES_PREFIX = "/auth";

router.post(`${AUTH_ROUTES_PREFIX}/sign-up`, AuthContoller.signup);
router.post(`${AUTH_ROUTES_PREFIX}/login`, AuthContoller.login);

module.exports = router;
