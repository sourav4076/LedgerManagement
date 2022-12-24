module.exports.handleFailure = (req,res,next,httpCode, message) => {
    return res.status(httpCode).json({errorMessage:message});
}

module.exports.handleSuccess = (req,res,next,httpCode, message, data) => {
    return res.status(httpCode).json({message:message, data: data});
}
