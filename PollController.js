exports.pollGetController = (req, res) => {
    res.render('create');
};
exports.pollPostController = (req, res) => {
    console.log(req.body);
    res.render('create');
};