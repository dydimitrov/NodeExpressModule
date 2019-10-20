function getError404(req, res) {
    res.render('error/404', )
}
function getError500(req, res) {
    res.render('error/500', )
}
module.exports = {
    getError: getError404,
    getError500
};