const aws = require('aws-sdk');

const awsValues = {
  name: process.env.AWS_VALUE_NAME,
  region: process.env.AWS_VALUE_REGION,
};
const formatAsDecodedBuffer = (value) => {
  // eslint-disable-next-line no-buffer-constructor
  const buff = new Buffer(value.SecretBinary, 'base64');
  return buff.toString('ascii');
};
const formatAsSecretString = (value) => JSON.parse(value.SecretString);

module.exports.getSecrets = () => {
  const { name, region } = awsValues;
  const client = new aws.SecretsManager({ region });

  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: name }, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.SecretString ? formatAsSecretString(data) : formatAsDecodedBuffer(data));
    });
  });
};
