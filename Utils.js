const EventEmitter = require('events');
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

exports.main = base_url;
exports.wordOfDay = wordSet;
exports.headerObj = options;