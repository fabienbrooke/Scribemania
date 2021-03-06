var require = {
  // this also gives an overview of all third-party libraries being used
  paths: {
    favico: '../vendor/favico-0.3.4.min',
    jquery: '../vendor/jquery.min',
    jadeRuntime: '../vendor/jade-runtime.min',
    livestamp: '../vendor/livestamp.min',
    moment: '../vendor/moment.min',
    primus: '../vendor/primus',
    tokeninput: '../vendor/jquery.tokeninput.min'
  },
  shim: {
    'tokeninput': ['jquery']
  }
};
