//console.log('Usage: ')
/*const htt = require('https');*/

/*const uri = new URL('https://www.google.com');*/
//
/*const request = htt.get(uri, (resp) => {
    //console.log(resp)
    resp.on('data', (dat) => {
        console.log(`BODY: ${dat}`);
    })
});*/
//console.log(request);

/*
console.log(process.argv.length)
process.argv.forEach(function (value, index, array) {
    console.log(index + ': ' + value)
    console.log(array)
})
*/
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


if (process.argv.length==3) {
    //console.log(process.argv[2]);
    var dictOption = process.argv[2];
    //if (process.argv.length[2])
    if (dictOption.toString()[0]!='-') {
        printHelp();
    } else {
        dictOption = dictOption.substring(1,dictOption.length);
        //console.log(dictOption);
        switch (dictOption.toLowerCase()) {
            case 'def':
                console.log('def');
                break;
            case 'syn':
                console.log('syn');
                break;
            case 'ant':
                console.log('ant');
                break;
            case 'ex':
                console.log('ex');
                break;
            case 'dict':
                console.log('dict');
                break;
            case 'wod':
                console.log('wod');
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


