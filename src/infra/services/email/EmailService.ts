import sgMail from "@sendgrid/mail";
import env from '../../../config/config'
import {WelcomeMail} from '../../../helpers/mailContent'
require("dotenv").config();

class EmailService  {
emailApi: string | undefined;
sgMail: any;
constructor(){
  this.emailApi = env.getEnv().EMAIL_API
   this.sgMail = sgMail.setApiKey(this.emailApi!)
    this.welcomeEmail = this.welcomeEmail.bind(this)
}

async welcomeEmail (message) {
  const { recipient } = message
    const msg = {
      to: recipient,
      from: 'funmibolarious@yahoo.com',
      subject: "Welcome to steply",
      html: WelcomeMail(recipient),
    };
    let info;
    try {
      info = await this.sgMail.send(msg);
    } catch (error) {
      console.log(error)
      if (error.response) {
        return error.response.body;
      }
    }
    return info;
}

}

export default new EmailService()