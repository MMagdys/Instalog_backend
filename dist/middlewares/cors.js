"use strict";
var express = require('express');
var cors = require('cors');
var app = express();
const whitelist = ['http://localhost:8080'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, { origin: true });
        }
        else {
            console.log("Not allowed by CORS");
            callback(new Error('Not allowed by CORS'));
        }
    }
};
exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);
