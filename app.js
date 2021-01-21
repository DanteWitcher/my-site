require('dotenv').config();
const express = require('express');
const path = require('path');
const errorHandler = require('errorhandler');
const log = require('./libs/log')(module);
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const favicon = require('serve-favicon');
const form = require('multer')();

const app = express();

i18n.configure({
    locales: ['en', 'ru'],
    cookie: 'lang',
    directory: __dirname + '/locales',
    queryParameter: 'lang'
});

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        '__': function () {
            return i18n.__.apply(this, arguments)
        },
        '__n': function () {
            return i18n.__n.apply(this, arguments)
        }
    }
}));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(form.array());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(i18n.init);
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')))

//pages
app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/about', routes.about);
app.get('/work', routes.work);
app.get('/contact', routes.contact);
//post
app.post('/contact', routes.post_contact);

//post
app.get('/download', async function(req, res) {
    const file = __dirname + '/assets/upload-folder/resume.docx';
    res.download(file); // Set disposition and send it.
});

app.listen(process.env.PORT || config.get('port'), async function () {
    log.info('Example app listening on port ' + process.env.PORT || 3000);
});

app.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        const error = errorHandler();
        app.use(error(err, req, res, next));
    }
    else {
        res.send(500);
    }
});

