import bcrypt from "bcryptjs";
import Passenger from "../models/passenger.js";

export const getSignup = (req, res) => {
  return res.render("register");
};

export const postSignup = async (req, res) => {
  const { fname, lname, sex, email, mobile, destination, password } = req.body;
  const duplicate = await Passenger.findOne({ email });
  if (duplicate) {
    req.flash("er_msg", "email already exist");
    return res.redirect("/signup");
  } 
    try {
      let hashPass = await bcrypt.hash(password, 10);
        await Passenger.create({
        fname,
        lname,
        sex,
        email,
        mobile,
        destination,
        password: hashPass
      });
      req.flash("success", "signup successful");
      return res.redirect("/");
    } catch (error) {
      req.flash("er_msg", "error passenger not crreated");
      return res.redirect("/signup");
      throw (error)
    }
};

export const getLogin = async (req, res) => {
  return res.render("login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const loggedPass = await Passenger.findOne({ email });
  if (!loggedPass) {
    req.flash("er_msg", "no email found");
    return res.redirect("/");
  }
    try {
      const match = await bcrypt.compare(password, loggedPass.password);
      if (!match) {
        req.flash("er_msg", "password error");
        return res.redirect("/");
      }
      if (match) {
        req.session.u_id = loggedPass._id;
        req.session.u_email = loggedPass.email;
        req.flash("success", `welcome ${loggedPass.fname + " " + loggedPass.lname}`);
        return res.redirect("/index");
      }
    } catch (error) {
      console.log(error)
      req.flash("er_msg", "unknown error");
      return res.redirect("/");
    }
};

export const logout = async (req, res) => {
  try {
    await req.session.destroy();
    return res.redirect("/");
  } catch (error) {
    req.flash("er_msg", "unknown error");
    return res.redirect("/");
  }
};
