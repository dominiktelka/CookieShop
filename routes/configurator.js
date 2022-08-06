const express = require('express');
const {getAddonsFromReq} = require("../utlis/get-addons-from-req");
const {COOKIE_ADDONS, COOKIE_BASES} = require("../data/cookies-data");
const {addonExist} =  require("../utlis/addonExist");

const configuratorRouter = express.Router();




configuratorRouter
    .get('/select-base/:baseName', (req,res) =>{
        const {baseName} = req.params;
        if(!COOKIE_BASES[baseName]){
            return res.render('error',{
                description: `There is no such base as ${baseName}`
            })
        }
        // if(COOKIE_BASES[baseName]){
        //     return res.render('error',{
        //         description: `You cant choose one more time ${baseName} base.`
        //     })
        // }


        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected',{
                baseName,
            });
    })
    .get('/added/:addonName', (req,res) =>{
        const {addonName} = req.params;
            if(!COOKIE_ADDONS[addonName]){
                return res.render('error',{
                    description: `There is no such addon as ${addonName}`
                })
            }

        const addons = getAddonsFromReq(req);
        if(addons.includes(addonName)){
            return res.render('error',{
                description: `${addonName} is already on your cookie. You cant add it twice`
            })
        }

        addons.push(addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added',{
                addonName,
            });
    })
    .get('/delete-addon/:addonName', (req,res) =>{
        const {addonName} = req.params;
        const oldAddons = getAddonsFromReq(req);

        if(!oldAddons.includes(addonName)){
            return res.render('error',{
                description: `Cannot delete something that isn't already added to the cookie ${addonName} `
            })
        }

        const addons = oldAddons.filter(addon => addon !== addonName)
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/removed',{
                addonName,
            });
    })

module.exports = {
    configuratorRouter,
}


// tu tworzymy funckej odpwoiedzialna za odbieranie i przesylanie na backend odpowiedzi od serwera uzywajac metody post