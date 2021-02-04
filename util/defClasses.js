// Used to define the each class.

class Server {
    constructor(server) {
        this.name = server.name,
        this.id = server.id,
        this.aLogChannel = "",
        this.trackedClanIDs = [],
        this.trackedUsers = []
    }
}

class simplePlayer {
    constructor(user) {
        this.name = user.name,
        this.clanCap = false,
        this.discordID = ''
        this.lastCheck = new Date()
    }
}

class Player {
    constructor(user) {
        this.name = user.name,
        this.questsCompleted = 0,
        this.totalXP = 0,
        this.combatLvl = 0,
        this.online = false,
        this.skills = {
            Attack : 0,
            Defence : 0,
            Strength : 0,
            Constitution : 0,
            Ranged : 0,
            Prayer : 0,
            Magic : 0,
            Cooking : 0,
            Woodcutting : 0,
            Fletching : 0,
            Fishing : 0,
            Firemaking : 0,
            Crafting : 0,
            Smithing : 0,
            Mining : 0,
            Herblore : 0,
            Agility : 0,
            Thieving : 0,
            Slayer : 0,
            Farming : 0,
            Runecrafting : 0,
            Hunter : 0,
            Construction : 0,
            Summoning : 0,
            Dungeoneering : 0,
            Divination : 0,
            Invention : 0
        },
        this.lastFetch = new Date()
    }
}

class Clan {
    constructor(cName, id, members, count) {
        this.name = cName,
        this.id = id,
        this.members = members,
        this.count = count,
        this.capdMembers = []
    }
}

module.exports = {
    Server,
    simplePlayer,
    Player,
    Clan
}