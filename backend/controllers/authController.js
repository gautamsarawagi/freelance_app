import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { fileSizeFormatter } from "../utils/fileUpload.js";
import cloudinary from "../utils/cloudinary.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

class authController {
  static createUser = async (req, res, next) => {
    try {
      const { username, email, password, country, desc, phone, isSeller } =
        req.body;

      if (!username || !email || !password || !country || !desc) {
        res.status(400);
        throw new Error("Please fill in all require fields");
      }

      if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be upto 6 characters");
      }

      const userEmailExists = await userModel.findOne({ email: email });

      if (userEmailExists) {
        res.status(400);
        throw new Error("Email has already been registered");
      }

      const userNameExists = await userModel.findOne({ username: username });

      if (userNameExists) {
        res.status(400);
        throw new Error("Username already in use");
      }

      let fileData = {};
      if (req.file) {
        let uploadFile;
        try {
          uploadFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "freelance_app",
            resource_type: "image",
          });
        } catch (error) {
          res.status(400);
          throw new Error("Image cannot be uploaded");
        }

        fileData = {
          fileName: req.file.originalname,
          filepath: uploadFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2),
        };
      }
      
      const newUser = await userModel.create({
        username:username,
        email:email,
        password:password,
        country:country,
        desc:desc,
        img: fileData.filepath,
        phone:phone,
        isSeller:isSeller,
      });

      if (newUser) {
        const { _id, username, email, country, img, phone, desc, isSeller } =
          newUser;
        res.status(201).json({
          _id,
          username,
          email,
          country,
          img,
          phone,
          desc,
          isSeller,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      next(error);
    }
  };

  static loginUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400);
        throw new Error("Please fill all the details");
      }

      const user = await userModel.findOne({ username: username });

      if (!user) {
        res.status(400);
        throw new Error("User not found.Please, signup first");
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      const token = generateToken(user._id);

      if (passwordMatched) {
        res.cookie("token", token),
          {
            path: "/",
            httpOnly: false,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
          };
      }

      if (user && passwordMatched) {
        const { _id, username, email, country, img, phone, desc, isSeller } =
          user;
        res.status(200).json({
          _id,
          username,
          email,
          country,
          img,
          phone,
          desc,
          isSeller,
          token,
        });
      } else {
        res.status(400);
        throw new Error("Invalid password or username");
      }
    } catch (error) {
      next(error);
    }
  };

  static logoutUser = async (req, res, next) => {
    try {
      res
        .clearCookie("token", {
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({ message: "Successfully logout" });
    } catch (error) {
      next(error);
    }
  };
}

export default authController;
