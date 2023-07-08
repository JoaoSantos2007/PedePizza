// Define token cookies in the response head
function defineCookies(req, res, accessToken = '', refreshToken = '') {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: !!req.headers['sec-fetch-mode'],
    sameSite: 'none',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !!req.headers['sec-fetch-mode'],
    sameSite: 'none',
  });
}

export default defineCookies;
