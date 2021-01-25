// Used to define the each class.

module.exports = {
    server,
    player,
    clan
}

class server {
    constructor(name, id) {
        this.name = name,
        this.id = id,
        this.aLogChannel = "",
        this.trackedClanIDs = [],
        this.trackedUsers = []
    }
}

class player {
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

class clan {
    constructor(clan) {
        this.name = clan.name,
        this.id = clan.id,
        this.members = [],
        this.count = 0,
        this.capdMembers = []
    }
}