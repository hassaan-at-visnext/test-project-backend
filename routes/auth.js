const express = require('express');
const router = express.Router();

const AuthController = require("../app/auth/AuthController");
const { Authentication } = require("../middlewares");

router.post('/sign-up', AuthController.signup);
router.post('/login', AuthController.login);

router.get('/me', Authentication.authenticate, AuthController.me);

module.exports = router;
