/*
* This is a helper file that includes code used by all the files in common.
*
* */

const base_url = 'https://od-api.oxforddictionaries.com/api/v1';
const options = {
    headers: {'app_id':'da5fe890', 'app_key':'388bfea43c336979bf1c297df4790292'},
    dataType: 'JSON',
    method: 'GET'
};
const wordSet = ['neurodiversity', 'vexillology', 'frass', 'umwelt', 'farrago', 'photoclinometry', 'metamaterial', 'embodiment', 'optogenetics', 'pro-am',
    'kinescopes','trichromatic', 'upstander', 'panpsychism', 'ambivert', 'biophilia', 'praxeology', 'calenture', 'rockist', 'blazar', 'cupule', 'magnetar',
    'agnosia', 'roustabout', 'jitney', 'cosplay', 'proprioception', 'sociogenic', 'evanesce', 'mulier', 'highbinder', 'codicology', 'ornithology',
    'genethlialogy', 'seamark', 'monomachy', 'consentient', 'pecuniosity', 'metewand', 'tympanites', 'ultraism', 'panurgic', 'mundungus', 'kleptomania',
    'kiasu', 'nemophilist' , 'fascicle', 'supercilious', 'torii', 'celadon'];
const playSet = ['able', 'acid', 'angry', 'automatic', 'awake', 'bad', 'beautiful', 'bent', 'bitter', 'black', 'blue', 'boiling', 'bright', 'broken', 'brown', 'certain', 'cheap',
    'chemical', 'chief', 'clean', 'clear' ,'cold' ,'common' ,'complete' ,'complex' ,'conscious' ,'cruel' ,'cut' ,'dark' ,'dead' ,'dear' ,'deep' ,'delicate' ,'dependent' ,
    'different' ,'dirty' ,'dry' ,'early' ,'elastic' ,'electric' ,'equal' ,'false' ,'fat' ,'feeble' ,'female' ,'fertile' ,'first' ,'fixed' ,'flat' ,'foolish' ,'free' ,'frequent'
    ,'full' ,'future' ,'general' ,'good' ,'gray' ,'great' ,'green' ,'hanging' ,'happy' ,'hard' ,'healthy' ,'high' ,'hollow' ,'ill' ,'important' ,'kind' ,'last' ,'late' ,'left'
    ,'like' ,'living' ,'long' ,'loose' ,'loud' ,'low' ,'male' ,'married' ,'material' ,'medical' ,'military' ,'mixed' ,'narrow' ,'natural' ,'necessary' ,'new' ,'normal' ,'old'
    ,'open' ,'opposite' ,'parallel' ,'past' ,'physical' ,'political' ,'poor' ,'possible' ,'present' ,'private' ,'probable' ,'public' ,'quick' ,'quiet' ,'ready' ,'red' ,'regular'
    ,'responsible' ,'right' ,'rough' ,'round' ,'sad' ,'safe' ,'same' ,'second' ,'secret' ,'separate' ,'serious' ,'sharp' ,'short' ,'shut' ,'simple' ,'slow' ,'small' ,'smooth'
    ,'soft' ,'solid' ,'special' ,'sticky' ,'stiff' ,'straight' ,'strange' ,'strong' ,'sudden' ,'sweet' ,'tall' ,'thick' ,'thin' ,'tight' ,'tired' ,'true' ,'violent' ,'waiting'
    ,'warm' ,'wet' ,'white' ,'wide' ,'wise' ,'wrong' ,'yellow' ,'young'];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function shuffle (str) {
    var a = str.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

exports.main = base_url;
exports.wordOfDay = wordSet;
exports.headerObj = options;
exports.gameSet = playSet;
exports.getRandomInt = getRandomInt;
exports.jumble = shuffle;