const nodemailer = require('nodemailer');

module.exports = usuario => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SENHA
      }
    });

    const mailOptions = {
      from: 'heitordobeis@gmail.com',
      to: usuario.email,
      subject: 'Validação de Email',
      html: `<p>Segue o link para validação de email: </p>
           <a href="http://localhost:3000/confirmacao/${usuario._id}">
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