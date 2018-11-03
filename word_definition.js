const https = require('https');
const utils = require('./Utils');
const EventEmitter = require('events');

/*
const req = https.get(new URL('https://od-api.oxforddictionaries.com/api/v1/entries/en/apple/definitions'), options,(res) => {
    //if (res.statusCode===200) {
    res.on('data', (dat) => {
        var d = dat.toString();
        var e = JSON.parse(d);
        //var f = JSON.parse();
        console.log(e.results[0].id);
    });
    //}*!/
    //console.log(res)
});
*/
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