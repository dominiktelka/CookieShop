const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const {homeRouter} = require('./routes/home');
const {configuratorRouter} = require('./routes/configurator');
const {orderRouter} = require('./routes/order');
const {handlebarsHelpers} = require("./utlis/handlebars-helpers");


const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.engine('.hbs', hbs.engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
// wskazujuemy ze bedzie uzywany silnik widoku z rozszerzeniem hbs
app.set('view engine', '.hbs');
// .hbs jako domyslny silnik ktory wygeneruje nam widok

app.use('/', homeRouter);
app.use('/configurator',configuratorRouter);
app.use('/order', orderRouter)



app.listen(3000, 'localhost')