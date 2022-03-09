/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var ce = require('./ce.js');

function nodeCe() { return ce(process.argv.slice(2), process.env); }

module.exports = nodeCe;
