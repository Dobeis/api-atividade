const nodemailer = require('nodemailer');
const config = require('../config')

module.exports = usuario => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL,
        pass: config.SENHA
      }
    });

    const mailOptions = {
      from: 'heitordobeis@gmail.com',
      to: usuario.email,
      subject: 'Validação de Email',
      html: `<p>Segue o link para validação de email: </p>
           <a href="http://localhost:3000/confirmacao/${usuario._id}">
            http://localhost:3000/confirmacao/${usuario._id}
           </a>
          `
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(info)
      }
    });
  })
}