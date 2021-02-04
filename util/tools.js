// const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require('axios').default
const c = require('./defClasses')

module.exports = {
    getClanInfo
}

// Resolves Clan page to ID and name
async function getClanInfo(clanURL) {
    // Get clan info (ID, name)
    let clanInfo = await getInfo(clanURL)
    console.log(`Clan Info %o`, clanInfo)
    // New Request for playerlist
    let playerArr = await requestHandler(clanInfo.id, clanInfo.maxPage)

    let clan = new c.Clan(clanInfo.cName, clanInfo.id, playerArr, playerArr.length)
    return clan
}

async function getInfo(clanURL) {
    try {
        console.log(`Making request to URL: ${clanURL}&ranking=-1&pageSize=45`)
        let response = await axios.get(`${clanURL}&ranking=-1&pageSize=45`)
        let res = response.data
        let html = res.replace(/�/g, " ")

        // Grab Name from pure HTML
        let nameRegex = /span> (\w+.\w+)\n/
        let cName = html.match(nameRegex)[1]

        // Grab last page Num
        let pageNumRegex = /(class="HoverImg PageControlAdvancedLast")(.*)pageNum=(\d+)"/
        let maxPage = html.match(pageNumRegex)[3]

        // Grab ID from pure HTML
        let clanIdRegex = /clanId=(\d+)/
        let id = html.match(clanIdRegex)[1]

        let output = {
            cName: cName,
            id: id,
            maxPage: maxPage
        }
        console.log(`Clan Name: ${cName} | ID: ${id} | Max User Pages: ${maxPage}`)
        return output
    } catch (err) {
        console.log(err)
    }
}

async function getPlayers(id, i) {
    console.log('Getting Players')
    let newUrl = `http://services.runescape.com/m=clan-hiscores/members.ws?clanId=${id}&ranking=-1&pageSize=45&pageNum=${i}`
    let tempList = []

    try {
        let response = await axios.get(newUrl)
        let res = response.data
        console.log('Request Successful')
        let html = res.replace(/�/g, " ")
        const $ = cheerio.load(html)
        $(`span[class=name]`).each((i, element) => {
            let user = $(element).text().toString()
            if (user !== 'Name') {
                tempList.push(user)
            }
        })
        // console.log(`USERLIST FOR PAGE ${i} %o`, tempList)
        return tempList
    } catch (err) {
        console.log(err)
    }

}

async function requestHandler(id, maxPage) {
    let workArray = buildArr(id, maxPage)
    console.log(`WORK ARRAY: %o`, workArray)
    let res = await Promise.all(workArray)
    let userList = []
    res.forEach(arr => {
        userList = userList.concat(arr)
    });
    console.log(`User List: %o`, userList)
    return userList
}

function buildArr(id, maxPage) {
    let output = []
    console.log(`Build Array - Max pages: ${maxPage}`)
    maxPage++
    for (let i = 1; i < maxPage; i++) {
        console.log(`Building array ${i}`)
        output.push((getPlayers(id, i)))
    }
    console.log(`OUTPUT: %o`, output)
    console.log(output)
    return output
}