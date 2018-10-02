const express = require('express');
const app = express();
const PORT = 3000;

const REQUEST_HEADER_FOR_SETTING = 'x-return-server';

const DEFAULT_RESPONSE_SETTING = {    
    status: 200,
    body: 'ok',
    headers: {
        'Content-Type': 'text/plain'
    }
}

const defaultHandler = function (req, res) {
    
    // extract response setting in JSON String from request header x-return-server
    let setting = Object.assign({}, DEFAULT_RESPONSE_SETTING);
    try {
        setting = Object.assign(setting, JSON.parse(req.get(REQUEST_HEADER_FOR_SETTING) || req.body));
    } catch (e) {
        // no settings provided, use default setting
    }
    // build response as instructed
    res.status(setting.status);
    res.set(setting.headers);
    res.send(setting.body);
}

app.all('*', defaultHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT}!`));