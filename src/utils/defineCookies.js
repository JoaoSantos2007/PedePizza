// Define token cookies in the response head
function defineCookies(req, res, accessToken = '', refreshToken = '') {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: req.protocol === 'https',
    sameSite: 'strict',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: req.protocol === 'https',
    sameSite: 'strict',
  });
}

export default defineCookies;
