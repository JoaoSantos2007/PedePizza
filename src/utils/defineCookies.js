// Define token cookies in the response head
function defineCookies(req, res, accessToken = '', refreshToken = '') {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
}

export default defineCookies;
