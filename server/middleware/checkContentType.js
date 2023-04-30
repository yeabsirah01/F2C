const contentType = require("content-type");

const checkContentType = (req, res, next) => {
  const contentTypeHeader = req.headers["content-type"];
  const { type } = contentType.parse(contentTypeHeader);

  if (type !== "multipart/form-data") {
    res.status(415).send("Invalid media type");
  } else {
    next();
  }
};

module.exports = checkContentType;
