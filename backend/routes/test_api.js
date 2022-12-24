const { handleSuccess } = require("../util/response_handler");

module.exports.testAPI = (req, res, next) => {
    console.log('user info :'+JSON.stringify(req.session.user));
    return handleSuccess(req, res, next,200, 'tested')
}