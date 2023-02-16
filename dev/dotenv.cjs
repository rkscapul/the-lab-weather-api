const pathLib = require('path');

console.log(process.env.APP_MODE);

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: pathLib.resolve(process.cwd(), `.env.${process.env.APP_MODE}`) });

console.log(process.env.AWS_REGION);
