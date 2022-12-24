const { handleSuccess } = require("../util/response_handler");

module.exports.testOpenAPI = (req, res, next) => {
    console.log('user info :'+JSON.stringify(req.user));
    return handleSuccess(req, res, next,200, 'tested')
}