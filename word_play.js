/*
* This file is a simple word guessing game, the game gives clues and the user has to guess the word correctly. This game does not accept synonyms as an answer.
* */
const https = require('https');
const utils = require('./Utils');
const readline = require('readline');
const _ = require('underscore');
const EventEmitter = require('events').EventEmitter;
const countEmitter = new EventEmitter();
const finalEmit = new EventEmitter();
var resultObj = [];
var groupedData =  {};
var callCount = 0;
var playWord = '';
var jumbleClueUsed = false;

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
* This function is a listener for user input after the game the user a clue.
* */
function listenforUserInput() {
    console.log('ENTER YOUR INPUT HERE: ');

    r1.on('line', function (dat) {
        if (dat != null) {
            switch (dat) {
                case 'q':
                    console.log('You gave up!! :(\n');
                    dat = null;
                    finalEmit.emit('wordPlay', groupedData);
                    r1.close();
                    break;
                case 'h':
                    printInstructions();
                    console.log('ENTER YOUR INPUT HERE: ');
                    dat = null;
                    break;
                case playWord:
                    console.log('Correct Answer!! :). But, here\'s the details again');
                    console.log(`Word: ${playWord}`);
                    dat = null;
                    finalEmit.emit('wordPlay', groupedData);
                    r1.close();
                    break;
                default:
                    console.log('Sorry, wrong guess, Try Again\n\n');
                    display();
                    dat = null;
                    break;
            }
        }
    });
}

function printClueAndListen(cat, clue) {
    console.log(`Part-of-Speech: ${cat}`);
    console.log('Clue: ' + Object.keys(clue)[0] + ' - ' + clue[Object.keys(clue)[0]]);
    listenforUserInput();
}

/*
* This function is used for displaying a clue to the user about the word.
* */
function display() {
    var dataO = resultObj[resultObj.length - 1];
    if (resultObj.length>0) {
        var cat = '';
        var clue = {};
        for (var key in dataO) {
            if (dataO.hasOwnProperty(key)) {
                switch (key) {
                    case 'category':
                        cat = dataO[key];
                        break;
                    case 'ant':
                        clue = {'antonym': dataO[key][0].text};
                        break;
                    case 'syn':
                        clue = {'synonym': dataO[key][0].text};
                        break;
                    case 'def':
                        clue = {'defnition': dataO[key]};
                        break;
                }
            }
        }
        printClueAndListen(cat, clue);
        resultObj.pop();
    } else {
        if (!jumbleClueUsed) {
            jumbleClueUsed = true;
            console.log(`Clue: The word jumbled is ${utils.jumble(playWord)}`);
            listenforUserInput();
        } else {
            r1.close();
            console.log('Sorry, no clues left...\n');
            finalEmit.emit('wordPlay', groupedData);
        }
    }
}

/*
* This function prints instructions for the game.
* */
function printInstructions() {
    console.log('Instructions for playing GuessPlay: \n\n');
    console.log('1. You get clues until you try to guess the right word after which the word is displayed and the game exits.');
    console.log('2. To exit the game in between just press \'q\'');
    console.log('3. All the words in this game are single worded.');
    console.log('4. You can have access to these instructions at any point of time. Just press \'h\'');
    console.log('\n\nEnjoy the game!!\n\n');
}

/*
* This is an event emitter to keep track of API calls.
* */
countEmitter.on('count', (callNo) => {
    if (callNo===2) {
        console.log('Start Guessing!!!\n');
        groupedData = _.mapObject(_.groupBy(resultObj, 'category'),
            dataList => dataList.map(prop => _.omit(prop, 'category')));
        printInstructions();
        display();
    }
});

/*
* Main class that handles the core functionality of this file
* */
class WordPlay extends EventEmitter{

    createCall(word) {
        var uri1 = utils.main + '/entries/en/' + word + '/definitions';
        var uri2 = utils.main + '/entries/en/' + word + '/synonyms';
        var uri3 = utils.main + '/entries/en/' + word + '/antonyms';

        const request1 = https.request(new URL(uri1), utils.headerObj,(res) => {

            if (res.statusCode===200) {
                var chunks = [];
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var f = response.results[0].lexicalEntries;
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'def': f[i].entries[0].senses[0].definitions[0]});
                        } catch (e) {
                            //this.emit('notFound','No examples found for: ' + word);
                        }
                    }
                    countEmitter.emit('count',callCount++);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                countEmitter.emit('count',callCount++);
            }
        });
        request1.on('error', (e) => {
            console.error(e);
        });
        request1.end();

        const request2 = https.request(new URL(uri2), utils.headerObj,(res) => {

            if (res.statusCode===200) {
                var chunks = [];
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var f = response.results[0].lexicalEntries;
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'syn': f[i].entries[0].senses[0].synonyms});
                        } catch (e) {
                            //this.emit('notFound','No synonyms found for: ' + word);
                        }
                    }
                    countEmitter.emit('count',callCount++);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                countEmitter.emit('count',callCount++);
            }
        });
        request2.on('error', (e) => {
            console.error(e);
        });
        request2.end();

        const request3 = https.request(new URL(uri3), utils.headerObj,(res) => {

            if (res.statusCode===200) {
                var chunks = [];
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var f = response.results[0].lexicalEntries;
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'ant': f[i].entries[0].senses[0].antonyms});
                        } catch (e) {
                            //this.emit('notFound','No antonyms found for: ' + word);
                        }
                    }
                    countEmitter.emit('count',callCount++);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                countEmitter.emit('count',callCount++);
                //this.emit('notFound','No synonyms found for: ' + word);
            }
        });
        request3.on('error', (e) => {
            console.error(e);
        });
        request3.end();
    }

    play(word) {
        playWord = word;
        this.createCall(word);
    }
}


module.exports.class = WordPlay;
module.exports.emitterObj = finalEmit;