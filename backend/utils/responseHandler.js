const respone = (res, statusCode, message, data = null) => {
    if (!res) {
        console.log("Response object is missing");
        return;
    }
    const responseObject = {
        status: statusCode < 400 ? "success" : "error",
        message,
        data
    }
    return res.status(statusCode).json(responseObject);
}
module.exports = response;