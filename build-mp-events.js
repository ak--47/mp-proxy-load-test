const token = process.env.TOKEN || `YOUR-TOKEN-HERE!`;

const Chance = require("chance");
const chance = new Chance();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const validTimes = buildTimes();

// generate an array of seconds in unix epoch time from 5 days ago to now

const actions = ["⚔️ attack", "🛡 defend", "🏃 move", "🪂 fly", "🩹 heal", "🦄 magic", "👤 spawn", "👥 respawn", "🎚 level up", "💰 gold"];
const races = ["human", "orc", "elf", "dwarf", "undead", "gnome", "troll", "goblin", "ogre"];
const classes = ["warrior", "mage", "priest", "rogue", "hunter", "warlock", "druid", "shaman", "paladin", "monk", "demon hunter"];
const conditions = ["invisible", "hastened", "slowed", "paralyzed", "strong", "weak", "underwater", "plagued", "frightened", "dizzy", "exhausted", "flying"];

// this builds events
function generateDataBatch(context, events, done) {
    const batchSize = Math.ceil(chance.d100() / 2);
    const dataBatch = [];

    const user = {
        distinct_id: chance.guid(),
        email: chance.email(),
        level: chance.integer({ min: 1, max: 100 }),
        username: chance.name(),
        race: chance.pickone(races),
        class: chance.pickone(classes)
    };

    for (let i = 0; i < batchSize; i++) {
        dataBatch.push({
            event: chance.pickone(actions),
            properties: {
                token,
                ...user,
                time: chance.pickone(validTimes),
                conditions: chance.pickset(conditions, chance.integer({ min: 1, max: 4 }))
            }
        });
    }

    context.vars.dataBatch = dataBatch;
    return done();
}

// this builds valid event times from 5 days ago to now
function buildTimes() {
    const now = dayjs.utc();
    const yesterday = now.subtract(1, "day");
	const secondsInDay = 60 * 60 * 24;    
    const seconds = [];
    for (let i = 0; i < secondsInDay; i++) {
        seconds.push(yesterday.add(i, "second").unix());
        //add some intrigue to times
        if (chance.d100() > 95) seconds.push(yesterday.add(i, "second").unix());
    }
    return seconds;
}

module.exports = {
    generateDataBatch: generateDataBatch
};
