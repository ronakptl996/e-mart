// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import JsonWebToken from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = JsonWebToken.verify(token, process.env.JWT_SECRET);
    let dbuser = await User.findOne({ email: user.email });
    const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(decryptedPass);

    if (decryptedPass == req.body.password) {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.npassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
      return;
    }
    // console.log(dbuser);
    res.status(400).json({ success: false });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
