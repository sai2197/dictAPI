/*
* This file is used to generate examples for a given word.
* */

const https = require('https');
const utils = require('./Utils');
const EventEmitter = require('events').EventEmitter;
var resultObj = [];


class WordExample extends EventEmitter{

    createCall(word) {
        var uri = utils.main + '/entries/en/' + word + '/examples';
        const request = https.request(new URL(uri), utils.headerObj,(res) => {
            if (res.statusCode===200) {
                var chunks = [];
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var f = response.results[0].lexicalEntries;
                    console.log(f.length + ' context(s) found\n\n');
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'ex': f[i].entries[0].senses[0].examples});
                        } catch (e) {
                            this.emit('notFound','No examples found for: ' + word);
                        }
                    }
                    this.emit('wordEx', resultObj);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                this.emit('notFound','No examples found for: ' + word);
            }
        });
        request.on('error', (e) => {
            console.error(e);
        });
        request.end();
    }

    getExample(word) {
        this.createCall(word);
    }
}


module.exports = WordExample;