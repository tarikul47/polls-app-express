exports.createPollGetController = (req, res) => {
    res.render('create');
};
exports.createPollPostController = (req, res) => {
    console.log(req.body);
    res.render('create');
};