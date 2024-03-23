const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticationStatus = (req, res, next) => {
  const authHeader = req.headers.authorization
  let token = null

  if (authHeader) {
    const parts = authHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  } else if (req.query.token) {
    token = req.query.token
  }

  if (!token) {
    req.isAuthenticated = false
    return next()
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, _decoded) => {
    req.isAuthenticated = !err
    next()
  })
}

module.exports = {
  authenticationStatus,
}
