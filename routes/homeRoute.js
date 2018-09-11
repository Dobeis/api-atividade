const router = require('express').Router()

router.route('/')
  .get((req, res) => res.status(200).send(`<p>API Online</p>`))

module.exports = router