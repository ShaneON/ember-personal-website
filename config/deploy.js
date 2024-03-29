/* eslint-env node */
'use strict';

module.exports = function (deployTarget) {
  let ENV = {
    build: {},
    s3: {
      filePattern:
        '**/*.{js,css,png,gif,ico,jpg,jpeg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html}',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'sgoneill.com',
      region: 'eu-west-1',
    },
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
