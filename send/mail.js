'use strict'
const nodemailer = require("nodemailer");

async function send(str) {
    // let testAccount = await nodemailer.createTestAccount();
    //
    // console.log(testAccount.user+"       "+testAccount.pass)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        service: 'qq',
        port: 465,
        secure: true,
        auth: {
            user: "@qq.com",
            pass: "" // // 这里密码不是qq密码，是你设置的smtp授权码
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <@qq.com>', // sender address
        to: "@163.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: str, // plain text body
        // html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// send(str).catch(console.error);
//link：https://segmentfault.com/a/1190000012251328
exports.send=send;