const { Router } = require("express");
const { register, getName } = require("../controllers/auth.controller");
const isAuth = require('../middleware/is-auth.middleware')

const router = Router()

router.post('/register', register)
router.get('/mansur', isAuth, getName)

module.exports = router