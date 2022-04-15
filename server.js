const express = require("express");
const router = express.Router()
const env = require('dotenv')
const cors = require("cors")
const nodemailer = require("nodemailer");

env.config();


const app = express();
app.use(cors())
app.use(express.json());



router.post("/contact", (req, res) => {
    const name= req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "arairegold1@gmail.com",
        subject: "Contact From Submission",
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}
                <p>Message: ${message}</p>`
    };
    contactEmail.sendMail(mail, (error) => {
        if(error) {
            res.json({status: "ERROR"});
        }else{
            res.json({ status: "Message Sent"})
        }
    })
})


app.use("/", router);




const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL,
        pass: process.env.PASS
    }
})

contactEmail.verify((error) =>{
    if(error){
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
})


app.listen(5000, ()=> console.log('server is running'))
