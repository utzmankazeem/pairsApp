import Passenger from "../models/passenger.js";

const aboutContent = "Fly with us today. get a taste of your dream flight experience. the best in the business with a class";
const contactContent = "Welcome to Pairs Today call us on +234 9099 876 8765 or whatsapp the number 💬";


export const getIndex = async (req, res) => {
  if (!req.session.u_id) {
    req.flash("er_msg", "please login to get access");
    return res.redirect("/");
  } 
  try {
      const Passengers = await Passenger.find({}).sort({
        "createdAt": -1 //finding the most recent
      });
      if (!Passengers) {
        req.flash("er_msg", "no one abord");
        return res.redirect("/signup");
      } else {
        return res.render("index", {
          "isLogged": req.session.u_id ? true : false,
          u_id: req.session.u_id,
          u_email: req.session.u_email,
          onboard: Passengers
        });
      }
    }
    catch (error) {
      req.flash("er_msg", `error passengers not found`);
      return res.redirect("/");
    }
};
export const getEditPassenger = async (req, res) => {
  const _id = req.params.id;
  if (!req.session.u_id) {
    req.flash("er_msg", "please login")
    return res.redirect("/");
  } 
  try {
      const Passengers = await Passenger.findById({ _id });
      return res.render("edit", {
        "isLogged": req.session.u_id ? true : false,
        u_email: req.session.u_email,
        id: req.session,
        edit: Passengers,
      });
    }
    catch (err) {
      req.flash("er_msg", "please choose passengers")
      return res.redirect("/index");
    }
};
export const postEditPassenger = async (req, res) => {
  const _id = req.params.id;
  if (!req.session.u_id) {
    req.flash("er_msg", "please login");
    return res.redirect("/");
  }
    try {
      const Passengers = await Passenger.findByIdAndUpdate({ _id }, req.body);
      if (Passengers) {
        req.flash("success", "passenger edited successful");
        return res.redirect("/index");
      }
      if(Passengers instanceof Error) {
        res.render("edit", {edit: Passengers}, Error)
      }
    } catch (er) {
      req.flash("er_msg", "error passenger not edited");
      return res.redirect("/index");
    }
};

export const aboutPage = (req, res) => {
  return res.render("about", {
    "isLogged": req.session.u_id ? true : false, 
    u_id: req.session.u_id,
    u_email: req.session.u_email,
    about: aboutContent })
}
export const contactPage = (req, res) => {
  return res.render("contact", {
    "isLogged": req.session.u_id ? true : false, 
    u_id: req.session.u_id,
    u_email: req.session.u_email,
    contact: contactContent })
}

export const deletePassenger = async (req, res) => {
  const _id = req.params._id;
  try {
    const Passengers = await Passenger.findByIdAndRemove({ _id });
    if (Passengers) {
      req.flash("success", "passenger deleted");
      return res.redirect("/index");
    }
  } catch (er) {
    req.flash("er_msg", "no data found");
    return res.redirect("/index");
    throw(er)
  }
};

