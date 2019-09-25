module.exports.getHome = (req, res) => {
        res.render('home/index');
};

module.exports.getAbout = (req, res) => {
    res.render('home/about');
};