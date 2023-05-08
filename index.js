require('dotenv').config();
const POSTMAN_API_KEY = process.env.POSTMAN_API_KEY;
const axios = require('axios');
const fs = require('fs');
const Converter = require('openapi-to-postmanv2');

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node script.js <OAS_FILE_PATH> <COLLECTION_ID>');
  process.exit(1);
}

const OAS_FILE_PATH = args[0];
const COLLECTION_ID = args[1];

function readOasFile(filePath) {
  if (!filePath) {
    throw new Error('File path must be provided');
  }

  try {
    return fs.readFileSync(filePath, { encoding: 'UTF8' });
  } catch (error) {
    throw new Error(`Error reading OAS file: ${error.message}`);
  }
}

const convertOpenApiData = async (openapiData) => {
  return new Promise((resolve, reject) => {
    Converter.convert({ type: 'string', data: openapiData }, {}, (err, conversionResult) => {
      if (err) {
        reject(err);
      } else if (!conversionResult.result) {
        reject(new Error(`Could not convert: ${conversionResult.reason}`));
      } else {
        resolve(conversionResult.output[0].data);
      }
    });
  });
};

async function getPostmanCollection(collectionId) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.getpostman.com/collections/${collectionId}`,
    headers: {
      'X-API-Key': POSTMAN_API_KEY
    }
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data, null, 2));
    return response;
  } catch (error) {
    console.log(error);
  }
}

const preparePostmanRequest = (input) => {
  const output = {
    collection: {
      info: {
        name: input.info.name,
        schema: input.info.schema
      },
      item: input.item
    }
  };
  return JSON.stringify(output);
};

async function updatePostmanCollection(collectionId, collection) {
  const data = preparePostmanRequest(collection);

  const config = {
    method: 'put',
    url: `https://api.getpostman.com/collections/${collectionId}`,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': POSTMAN_API_KEY
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}


async function main() {
  try {
    const OAS_FILE = readOasFile(OAS_FILE_PATH);
    const conversionResult = await convertOpenApiData(OAS_FILE);
    const updatedCollection = await updatePostmanCollection(COLLECTION_ID, conversionResult);
    console.log('The collection object is: ', conversionResult);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

main();
