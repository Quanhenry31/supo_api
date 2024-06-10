const { Op } = require("sequelize");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  // API
  // [GET] /users
  getUser = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await userService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /users
  createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await userService.create({
      ...req.body,

      password: hashedPassword,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [POST] /login
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ code: -1, message: "Email and password are required" });
      }

      const { data: user } = await userService.find({
        findOne: true,
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ code: -1, message: "No email existed" });
      }

      if (!user.password) {
        return res
          .status(500)
          .json({ code: -1, message: "Password not available for user" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ code: -1, message: "Password not matched" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, name: user.name },
        "your_secret_key",
        {
          expiresIn: "1h",
        }
      );
      // Set token as a cookie
      res.cookie("token", token, { httpOnly: true }); // You can set additional options as needed

      res.json({ code: 0, message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ code: -1, message: "Internal server error" });
    }
  };

  // currentUser
  currentUser = async (req, res) => {
    const data = await userService.find({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }
    res.json(data);
  };

  // clear Token
  clearToken = async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Token cleared successfully" });
    } catch (error) {
      console.error("Error clearing token:", error);
      res.status(500).json({ code: -1, message: "Internal server error" });
    }
  };

  // [PUT] /users/:id
  updateUser = async (req, res) => {
    const hashedPassword = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : undefined;
    const id = req.params.id;
    const data = await userService.update({
      data: {
        ...req.body,
        ...(hashedPassword && { password: hashedPassword }),
      },
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [DELETE] /users/:id
  deleteUser = async (req, res) => {
    const id = req.params.id;

    const data = await userService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /products/search?query=?
  searchUser = async (req, res) => {
    const query = req.query.q;

    const data = await userService.find({
      where: {
        [Op.or]: [
          { id: query },
          { userName: { [Op.substring]: query } },
          { address: { [Op.substring]: query } },
        ],
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
}

module.exports = new UserController();
