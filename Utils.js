const EventEmitter = require('events');
const base_url = 'https://od-api.oxforddictionaries.com/api/v1';
const options = {
    headers: {'app_id':'da5fe890', 'app_key':'388bfea43c336979bf1c297df4790292'},
    dataType: 'JSON',
    method: 'GET'
};

exports.main = base_url;
exports.headerObj = options;