const {getAddonsFromReq} =  require( "../utlis/get-addons-from-req")
const {handlebarsHelpers} = require("../utlis/handlebars-helpers")
const {COOKIE_ADDONS, COOKIE_BASES}= require ("../data/cookies-data")

function getCookieSettings(req)  {
    const {cookieBase: base} = req.cookies;

    const addons = getAddonsFromReq(req)

    const allBases = Object.entries(COOKIE_BASES);
    const allAddons = Object.entries(COOKIE_ADDONS);

    const sum = (base ? handlebarsHelpers['find-price'](allBases, base) : 0)
        + addons.reduce((prev,curr) => {
            return prev + handlebarsHelpers['find-price'](allAddons,curr )
        },0);

        return{

            //Selected stuff
            addons,
            base,

            //Calculations
            sum,


            //All possibilities
            allBases,
            allAddons
        }
}

module.exports = {
    getCookieSettings,
}