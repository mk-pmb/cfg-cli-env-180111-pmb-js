/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80 */
/*globals define:true*/
(function () {
  'use strict';
  var EX, argKeyRx = /^(\-{2}|)(\w[\w\-]*)(=|$)/;

  function splitArg(arg, cfg) {
    var m = (argKeyRx.exec(arg) || ['', '', arg]), dashes = m[1], key = m[2],
      eq = m[3], val = (eq ? arg.slice(m[0].length) : true);
    if (dashes === '--') { key = key.replace(/\-/g, '_'); }
    cfg[key] = val;
  }

  EX = function (args, env) {
    var cliOpt = {};
    if (args) { args.forEach(function (arg) { splitArg(arg, cliOpt); }); }
    function cfg(vn) {
      return (cliOpt[vn] || env[vn] || env[vn.toUpperCase()]);
    }
    cfg.guessProxyPort = function (proto) {
      var vn = proto + '_proxy';
      return (+(String(env[vn] || env[vn.toUpperCase] || ''
        ).match(/:(\d+)\/?$/) || false)[1] || false);
    };
    return cfg;
  };



  (function universalExport(e) {
    /*global define: true */
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function () { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));
}());
