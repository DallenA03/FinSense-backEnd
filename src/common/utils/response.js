export const successResponse = (res, statusCode = 200, message = "Success", data = null) => {
  const responseObj = {
    success: true,
    message,
  };
  if (data) {
    responseObj.data = data;
  }
  return res.status(statusCode).json(responseObj);
};

export const errorResponse = (res, statusCode = 500, message = "Internal Server Error", extraData = null) => {
  const responseObj = {
    success: false,
    message,
  };
  if (extraData) {
    Object.assign(responseObj, extraData);
  }
  return res.status(statusCode).json(responseObj);
};
