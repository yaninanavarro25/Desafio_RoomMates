import nodemailer from "nodemailer";
import fs from "fs";
import 'dotenv/config'
const { USER_EMAIL, USER_PASSWORD } = process.env;




let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

export const sendEmail = async ( monto, descripcion, roommate ) => {
  const correos = JSON.parse(
    fs.readFileSync("./data/roommates.json")
    
  ).roommates.map((r) => r.email);
  
  let mailOptions = {
    from: USER_EMAIL,
    to: [USER_EMAIL].concat(correos),
    subject: `¡Nuevo gasto entre roomies registrado!`,
    html: `<h6>${roommate} ha registrado un gasto de $${monto} por el siguiente motivo: ${descripcion}</h6>`,
  };
  
  try {
    const result = transporter.sendMail(mailOptions);
    return result;
  } catch (e) {
    throw e;
  }
};