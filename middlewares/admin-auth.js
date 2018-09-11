const adminAuth = (req, res, next) => {
  return req['authUser']
    ? req['authUser'].eh_administrador
      ? next()
      : res.status(401).json({ message: 'Você não é um administrador'})
    : res.status(401).json({ message: 'Você não é um administrador'})
}

module.exports = adminAuth