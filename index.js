const request = require("request-promise");
const cheerio = require("cheerio");
const config = require("./config.json")
const discord = require('./discord/relay')
const c = require('./util/defClasses')

module.exports = {
    getProfile,
    getActivity,
    getClanUsers
}

// Request to RS Clan Site
async function getClanUsers(clanID) {
    let clanUrl = `http://services.runescape.com/m=clan-hiscores/members.ws?clanId=${clanID || config.test.clanID}&ranking=-1&pageSize=45`
    const result = await request.get(clanUrl).catch(function (err) {
        console.log(err)
    })
    let playerlist = []
    let html = result.replace(/�/g, " ")
    const $ = cheerio.load(html);
    $(`span[class=name]`).each((index, element) => {
        let user = $(element).text().toString()
        playerlist.push(user)
    })
    console.log(playerlist)
    return playerlist
}

// Get profile of user which includes Skills & Activity Feed (4 Events)
// Format of https://apps.runescape.com/runemetrics/profile/profile?user=$PLAYER
async function getProfile(user) {
    let userURL = `https://apps.runescape.com/runemetrics/profile/profile?user=${user || config.test.user}`
    console.log(userURL)
    const result = await request.get(userURL).catch(function (err) {
        console.log(err)
    })
    console.log(result)
}

// Get activity feed for any given user
// Format of https://apps.runescape.com/runemetrics/profile/profile?user=$PLAYER&activities=20
async function getActivity(user) {
    let userURL = `https://apps.runescape.com/runemetrics/profile/profile?user=${user || config.test.user}&activities=20`
    console.log(userURL)
    const result = await request.get(userURL).catch(function (err) {
        console.log(err)
    })
    console.log(result)
}

// getProfile()
// getClanUsers()
// async function fillClanUsers()

// Parse
