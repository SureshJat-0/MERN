const showFlashMsg = (req, res) => {
  res.json({
    success: req.flash("success_msg"),
    error: req.flash("error_msg"),
    info: req.flash("info_msg"),
  });
};

const setInfoMsg = (req, res) => {
    req.flash('info_msg', req.body.infoMsg);
    res.send(req.body);
};

module.exports = {
  showFlashMsg,
  setInfoMsg,
};
