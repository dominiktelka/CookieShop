const express = require('express');
const {getCookieSettings} = require("../utlis/get-cookie-setings");

const homeRouter = express.Router();

homeRouter
    .get('/', (req,res) =>{
        const {sum, addons, base,allBases, allAddons} = getCookieSettings(req)

        res.render('home/index',{
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        })
    })

module.exports = {
    homeRouter,
}
