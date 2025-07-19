import User from "../model/User.js";

 //@dec regester user
 //@route POST /api/users
 //@access Privet/admin

export const registerUserCtrl = async (requestAnimationFrame, res) => {
  res.json({
    msg: "user regester controller",
  });
};
