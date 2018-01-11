/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('assert').deepStrictEqual;


(function readmeDemo(args, env) {
  // #BEGIN# usage demo
  args = [ '/bin/dummy', 'test.js',
    '--foo',
    'bar',
    '--foo-bar=12',
    'foo-bar=34',
    'bar_foo=56',
    'BAR_FOO=78',
    ];
  env = { XDG_SEAT: 'seat0',
    http_proxy: 'http://localhost:3456/',
    https_proxy: 'http://localhost:7890/',
    };
  var readCliEnvCfg = require('cfg-cli-env-180111-pmb'),
    cfg = readCliEnvCfg(args, env);

  eq(cfg('--foo'), undefined);
  eq(cfg('foo'), true);
  eq(cfg('bar'), true);

  eq(cfg('--foo-bar'), undefined);
  eq(cfg('foo_bar'), '12');
  eq(cfg('FOO_BAR'), undefined);
  eq(cfg('foo-bar'), '34');
  eq(cfg('bar_foo'), '56');
  eq(cfg('BAR_FOO'), '78');

  eq(cfg('xdg_seat'), 'seat0');
  eq(cfg('XDG_SEAT'), 'seat0');
  eq(cfg('http_proxy').slice(-3), '56/');
  eq(cfg('HTTP_PROXY'), undefined);
  // #ENDOF# usage demo
}());









console.log("+OK usage demo test passed.");   //= "+OK usage demo test passed."
