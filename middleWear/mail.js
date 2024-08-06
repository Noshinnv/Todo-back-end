import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",//host and port will be common for all
    port: 465,
    auth: {
        user: "nozznoshin@gmail.com",
        pass: "pcbmzwmcusnvvfye",//app password created from our gmail 2 step verification (only for sending mails)
    },
});

// The below function returns true if the mail send else return false

export const sendMail = async (reciver, subject, message) => {

    const info = await transporter.sendMail({
        from: "nozznoshin@gmail.com",
        to: reciver,
        subject: subject,
        text: message,
    })
        .then(data => { return true })
        .catch(err => { console.log(err) })
    return info;
}

export const randomPassGen = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
    }
    return result;
}
