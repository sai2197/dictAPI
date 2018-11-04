/*
* This file is used to generate definitions for given word.
* */

const https = require('https');
const utils = require('./Utils');
const EventEmitter = require('events');

class WordDefinition extends EventEmitter{
    createCall(word) {
        var uri = utils.main + '/entries/en/' + word + '/definitions';

        const request = https.get(new URL(uri), utils.headerObj,(res) => {
            if (res.statusCode===200) {
                let chunks = [];
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var resultObj = [];
                    var f = response.results[0].lexicalEntries;
                    console.log(f.length + ' definition(s) found\n\n');
                    for (var i = 0; i < f.length; i++) {
                        resultObj.push({'category': f[i].lexicalCategory, 'defnition': f[i].entries[0].senses[0].definitions[0]});
                    }
                    this.emit('wordDef', resultObj);
                })
            } else if (res.statusCode===404) {
                this.emit('notFound','The word ' + word +' is not found in the database');
            }
        });
        request.on('error', (e) => {
            console.error(e);
        });
        request.end();
    }

    getDefinition(word) {
        this.createCall(word);
    }
}


module.exports = WordDefinition;