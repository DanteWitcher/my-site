"# My_site" 
Проект ещё очень сырой, поэтому:
1. Для запуска нужно подключить MongoDb, по умолчанию подключается по коллекции emails, url находится в config/config.json {"urlb": "mongodb://localhost:27017/emails";
2. Для отправки почты, нужно прописать в app.js корректные user и pass gmail почты, для настройки соединения.
auth: {
    user: "galaktika.kill@gmail.com", //Email of the sender, for connections of SMTP
    pass: "password" //password !!!
} 
3. В отправке сообщения на mongoDB, значения стоят по умолчанию(libs/mongoose.js), для использования input значения формы - вставить закомментированные значения.
new message({
            name: "zhenya",
            email: "sas@mail.com",//req.body.email,
            ip: "sadad",//req.ip,
            text: "asdasd",// req.body.message,
            date: new Date()
        })
4. Запускается в app.js, можно npm start