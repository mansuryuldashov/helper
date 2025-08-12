const fs = require("fs/promises");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const Io = require("../helpers/io");
const usersDb = new Io(`${process.cwd()}/database/users.json`);
const User = require("../modules/users");
const { signToken } = require("../helpers/jwt");

async function register(req, res) {
    try {
        const { fullname, username, password, age } = req.body;

        const schema = Joi.object({
            fullname: Joi.string().min(5).required(),
            username: Joi.string().min(5).required(),
            password: Joi.string().min(5).required(),
            age: Joi.number().min(20).strict(),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ message: `Validation error: ${error.message}` });
        }

        const hashPass = await bcrypt.hash(password, 12);

        const users = await usersDb.read();

        const isExist = users.find((e) => e.username === username);

        if (isExist) {
            return res
                .status(403)
                .json({ message: "Username already exist!!!" });
        }

        const id = uuid();

        const newUser = new User(id, fullname, username, hashPass, age);

        users.push(newUser);

        await usersDb.write(users);

        const token = await signToken(id, username);

        res.status(201).json({ data: { id: id, accessToken: token } });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: "Internal Server Error!!!" });
    }
}

async function getName(req, res) {
    res.status(200).json({ message: "Mansurboy Hello!!!", data: {username: req.user.username} });
}

module.exports = { register, getName };
