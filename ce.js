/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80 */
/*globals define:true*/
(function () {
  'use strict';
  var EX, argKeyRx = /^(\-{2}|)(\w[\w\-]*)(=|$)/,
    hasOwn = Function.call.bind(Object.prototype.hasOwnProperty);

  function splitArg(arg, cfg) {
    var m = (argKeyRx.exec(arg) || ['', '', arg]), dashes = m[1], key = m[2],
      eq = m[3], val = (eq ? arg.slice(m[0].length) : true);
    if (dashes === '--') { key = key.replace(/\-/g, '_'); }
    cfg[key] = val;
  }

  function getOwn(o, k, d) { return (hasOwn(o, k) ? o[k] : d); }


  EX = function (args, env) {
    var cliOpt = {};
    if (!env) { env = false; }
    if (args) { args.forEach(function (arg) { splitArg(arg, cliOpt); }); }
    function cfg(vn, df) {
      var val = getOwn(cliOpt, vn);
      if (val !== undefined) { return val; }
      val = getOwn(env, vn);
      if (val) { return val; }
      val = getOwn(env, vn.toUpperCase());
      if (val !== undefined) { return val; }
      return df;
    }
    cfg.allCliOpt = cliOpt;
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
