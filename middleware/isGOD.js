module.exports = (req, res, next) => {
  if (req.user.username !== "GOD") {
    res.status(403).redirect("/");
  }
  next();
};
