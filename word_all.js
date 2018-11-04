/*
* This file is used to generate all details for a given word.
* */

const https = require('https');
const utils = require('./Utils');
const EventEmitter = require('events').EventEmitter;
const countEmitter = new EventEmitter();
const finalEmit = new EventEmitter();
var resultObj = [];
var callCount = 0;


countEmitter.on('count', (callNo) => {
    if (callNo===3) {
        finalEmit.emit('wordAll', resultObj);
    }
});

class WordAll extends EventEmitter{

    createCall(word) {
        var uri = utils.main + '/entries/en/' + word + '/sentences';
        var uri1 = utils.main + '/entries/en/' + word + '/definitions';
        var uri2 = utils.main + '/entries/en/' + word + '/synonyms';
        var uri3 = utils.main + '/entries/en/' + word + '/antonyms';
        const request = https.request(new URL(uri), utils.headerObj,(res) => {

            if (res.statusCode===200) {
                var chunks = [];
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var f = response.results[0].lexicalEntries;
                    //console.log(f.length + ' context(s) found\n\n');
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'ex': f[i].sentences});
                        } catch (e) {
                            this.emit('notFound','No examples found for: ' + word);
                        }
                    }
                    //this.emit('wordEx', resultObj);
                    countEmitter.emit('count',callCount++);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                this.emit('notFound','No examples found for: ' + word);
                countEmitter.emit('count',callCount++);
            }
        });
        request.on('error', (e) => {
            console.error(e);
        });
        request.end();

        const request1 = https.request(new URL(uri1), utils.headerObj,(res) => {

            if (res.statusCode===200) {
                var chunks = [];
                res.on('end', (final) => {
                    var dat = Buffer.concat(chunks);
                    var response = JSON.parse(dat.toString());
                    var f = response.results[0].lexicalEntries;
                    //console.log(f.length + ' context(s) found\n\n');
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'defnition': f[i].entries[0].senses[0].definitions[0]});
                        } catch (e) {
                            this.emit('notFound','No examples found for: ' + word);
                        }
                    }
                    countEmitter.emit('count',callCount++);
                    //this.emit('wordEx', resultObj);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                countEmitter.emit('count',callCount++);
                this.emit('notFound','No examples found for: ' + word);
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
                    //console.log(f.length + ' context(s) found\n\n');
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'syn': f[i].entries[0].senses[0].synonyms});
                        } catch (e) {
                            this.emit('notFound','No synonyms found for: ' + word);
                        }
                    }
                    countEmitter.emit('count',callCount++);
                    //this.emit('wordEx', resultObj);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                countEmitter.emit('count',callCount++);
                this.emit('notFound','No synonyms found for: ' + word);
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
                    //console.log(f.length + ' context(s) found\n\n');
                    for (var i = 0; i < f.length; i++) {
                        try {
                            resultObj.push({'category': f[i].lexicalCategory, 'ant': f[i].entries[0].senses[0].antonyms});
                        } catch (e) {
                            this.emit('notFound','No antonyms found for: ' + word);
                        }
                    }
                    countEmitter.emit('count',callCount++);
                    //this.emit('wordAll', resultObj);
                });
                res.on('data', (dat) => {
                    chunks.push(dat);
                });
            } else if (res.statusCode===404) {
                countEmitter.emit('count',callCount++);
                this.emit('notFound','No synonyms found for: ' + word);
            }
        });
        request3.on('error', (e) => {
            console.error(e);
        });
        request3.end();
    }

    getAll(word) {
        this.createCall(word);
    }
}


module.exports.class = WordAll;
module.exports.emitterObj = finalEmit;