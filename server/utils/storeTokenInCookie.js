const storeTokenInCookie = (user, res, statusCode) => {
  const token = user.getJWTToken();
  res
    .status(statusCode)
    .cookie("todoJWTToken", token, {
      httpOnly: true,  
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      token,
      user,
    });
};

module.exports = storeTokenInCookie;
