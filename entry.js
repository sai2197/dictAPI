
/*
* This program is the main one out of all the ones and should be excuted directly using Node.
* This module uses other modules, one for each functionality of the Api and calls them accordingly by means of the 'require' function.
* */


/*
* The function below is used to guide the user on how to use the API.
* */

const _= require('underscore');
const util = require('./Utils');

function printHelp() {
    console.log('Usage: ');
    console.log('node entry.js -<option> <word>\n\n');
    console.log('Options: ');
    console.log('-def       -> Gives the defnition/meaning of the word');
    console.log('-syn       -> Gives synonyms (or) words with same meaning for given word');
    console.log('-ant       -> Gives antonyms (or) words with opposite meaning for given word');
    console.log('-ex       -> Gives an example for given word ');
    console.log('-dict       -> Gives all the above details for given word ');
    console.log('-wod       -> Gives all the above details for word-of-the-day ');
    console.log('-play       -> Initializes the word game ');
    console.log('\n\n');
    console.log('Example: ');
    console.log('node entry -def kid');
    console.log('Defnition: A child or a young person.');
}


function printAllData(data) {

    console.log('Definition: ' + data[0].defnition);
    console.log('\n');

    try {
        var antString = 'Antonyms:  ';
        data[1].ant.forEach(function (antObj) {
            antString += antObj.text + ', '
        });
        console.log(antString);
        console.log('\n');
    } catch (e) {
        console.log('No Antonyms found. \n');
    }

    try {
        var synString = 'Synonyms:  ';
        data[2].syn.forEach(function (synObj) {
            synString += synObj.text + ', '
        });
        console.log(synString);
        console.log('\n');
    } catch (e) {
        console.log('No Synonyms found. \n');
    }

    try {
        var exString = 'Examples:\n';
        data[3].ex.slice(0,5).forEach(function (exObj) {
            exString += '-> ' + exObj.text + '\n'
        });
        console.log(exString);
        console.log('\n');
    } catch (e) {
        console.log('No Examples found. \n');
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

if (process.argv.length>=3) {
    var dictOption = process.argv[2];
    if (dictOption.toString()[0]!=='-') {
        printHelp();
    } else {
        dictOption = dictOption.substring(1,dictOption.length);
        var wordArray = process.argv.splice(3,process.argv.length);
        var displayWord = wordArray.toString().split(',').join(' ').toLowerCase();
        var searchWord = wordArray.toString().split(',').join('_').toLowerCase();

        switch (dictOption.toLowerCase()) {
            case 'def':
                if (wordArray.length > 0) {
                    const WordDefinition = require('./word_definition');
                    const worddefinition = new WordDefinition();
                    worddefinition.on('wordDef', (ans) => {
                        ans.forEach(function (item) {
                            console.log('Lexical Category: ' + item.category);
                            console.log('Definition: ' + item.defnition);
                            console.log('\n');
                        });
                    });
                    worddefinition.on('notFound', (ans) => {
                        console.log(ans);
                    });
                    console.log('Input Word: ' + displayWord + '\n');
                    worddefinition.getDefinition(searchWord);
                } else {
                    printHelp();
                }
                break;
            case 'syn':
                if (wordArray.length > 0) {
                    const WordSynonym = require('./word_synonym');
                    const wordsynonym = new WordSynonym();
                    wordsynonym.on('wordSyn', (ans) => {
                        ans.forEach(function (item) {
                            console.log('Lexical Category:  ' + item.category);
                            var synString = 'Synonyms:  ';
                            item.syn.forEach(function (synObj) {
                                synString += synObj.text + ', '
                            });
                            console.log(synString);
                            console.log('\n');
                        });
                    });
                    wordsynonym.on('notFound', (ans) => {
                        console.log(ans);
                    });
                    console.log('Input Word: ' + displayWord + '\n');
                    wordsynonym.getSynonym(searchWord);
                } else {
                    printHelp();
                }
                break;
            case 'ant':
                //console.log('ant');
                if (wordArray.length > 0) {
                    const WordAntonym = require('./word_antonym');
                    const wordantonym = new WordAntonym();
                    wordantonym.on('wordAnt', (ans) => {
                        ans.forEach(function (item) {
                            console.log('Lexical Category:  ' + item.category);
                            var antString = 'Antonyms:  ';
                            item.ant.forEach(function (antObj) {
                                antString += antObj.text + ', '
                            });
                            console.log(antString);
                            console.log('\n');
                        });
                    });
                    wordantonym.on('notFound', (ans) => {
                        console.log(ans);
                    });
                    console.log('Input Word: ' + displayWord + '\n');
                    wordantonym.getAntonym(searchWord);
                } else {
                    printHelp();
                }
                break;
            case 'ex':
                //console.log('ex');
                if (wordArray.length > 0) {
                    const WordExample = require('./word_example');
                    const wordexample = new WordExample();
                    wordexample.on('wordEx', (ans) => {
                        ans.forEach(function (item) {
                            console.log('Lexical Category:  ' + item.category);
                            var exString = 'Examples:\n';
                            item.ex.forEach(function (exObj) {
                                exString += '-> ' + exObj.text + '\n'
                            });
                            console.log(exString);
                            console.log('\n');
                        });
                    });
                    wordexample.on('notFound', (ans) => {
                        console.log(ans);
                    });
                    console.log('Input Word: ' + displayWord + '\n');
                    wordexample.getExample(searchWord);
                } else {
                    printHelp();
                }
                break;
            case 'dict':
                //console.log('dict');
                if (wordArray.length > 0) {
                    const WordAll = require('./word_all');
                    const wordallClass = WordAll.class;
                    const wordall = new wordallClass();
                    const wordallEmitter = WordAll.emitterObj;
                    wordallEmitter.on('wordAll', (ans) => {
                        var groupedData = _.mapObject(_.groupBy(ans, 'category'),
                            dataList => dataList.map(prop => _.omit(prop, 'category')));
                        //console.log(groupedData);
                        for (var key in groupedData) {
                            if (groupedData.hasOwnProperty(key)) {
                                console.log('Lexical Category: '+ key);
                                printAllData(groupedData[key]);
                                console.log('\n\n');
                            }
                        }
                    });
                    console.log('Input Word: ' + displayWord + '\n');
                    wordall.getAll(searchWord);
                } else {
                    printHelp();
                }

                break;
            case 'wod':
                console.log(util.wordOfDay.length);
                console.log('Word-of-the-day is:  ' + util.wordOfDay[getRandomInt(util.wordOfDay.length)]);
                break;
            case 'play':
                console.log('play');
                break;
            default:
                printHelp();

        }
    }
} else {
    printHelp();
}


