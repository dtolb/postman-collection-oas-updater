const fs = require('fs');
const path = require('path');
const { convertOpenApiData } = require('../script');

describe('convertOpenApiData', () => {
  it('should successfully convert a valid OpenAPI spec to a Postman collection', async () => {
    const sampleOpenApiSpec = fs.readFileSync(
      path.join(__dirname, '../sampleOpenApiSpec.yaml'),
      { encoding: 'UTF8' }
    );

    try {
      const postmanCollection = await convertOpenApiData(sampleOpenApiSpec);
      expect(postmanCollection).toHaveProperty('info');
      expect(postmanCollection).toHaveProperty('item');
      expect(postmanCollection.info).toHaveProperty('name', 'Sample API');
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  });
});
