const nodemailer = require('nodemailer');
const mongoose = require('../libs/mongoose');

mongoose.Promise = Promise;  

module.exports = function (req, res) {
    const messageSend = {
        ru: {
            good: 'Ваше сообщение успешно доставлено, спасибо!',
            bad: 'Ваше сообщение не удалось отправить, что-то бл*ть поломалось :(',
        },
        en: {
            good: 'Your message has been sent, thanks',
            bad: 'Your message has been sent, sorry :( try again a little bit latter',
        },
    };

    const isRu = () => {
        return !!req.locale && req.locale === 'ru';
    };

    let mailOpts, smtpTrans, db_data;

    smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `${process.env.SENDER}` || 'login',
            pass: `${process.env.PASSWORD}` || 'pass'
        }
    });

    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: `${process.env.RECIPIENT}`, 
        subject: 'Message title',
        text: req.body.message + ' email: ' + req.body.email + ', name: ' + req.body.name
    };

    db_data = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        ip: req.ip
    };

    smtpTrans.sendMail(mailOpts, function (error, response) {
        const _message = isRu() ? messageSend.ru : messageSend.en;

        console.log(`Sending of message, error = ${error}`);

        if (error) {
            res.send(JSON.stringify({ message: _message.bad }));
        } else {
            mongoose(db_data).then((answer) => {
                console.log(answer);
                if (!answer) {
                    console.log('-1');
                    res.send(JSON.stringify({ message: _message.bad }));
                } 

                console.log('1');
                res.send(JSON.stringify({ message: _message.good }));
            });
        }
    });
}