const nock = require('nock');
const { getPostmanCollection } = require('../script');

describe('getPostmanCollection', () => {
  it('should successfully retrieve a Postman collection', async () => {
    const collectionId = 'sample-collection-id';

    // Mock the Postman API response
    nock('https://api.getpostman.com')
      .get(`/collections/${collectionId}`)
      .reply(200, {
        collection: {
          info: {
            name: 'Sample Collection',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
          },
          item: [],
        },
      });

    try {
      const response = await getPostmanCollection(collectionId);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('collection');
      expect(response.data.collection).toHaveProperty('info');
      expect(response.data.collection).toHaveProperty('item');
      expect(response.data.collection.info).toHaveProperty('name', 'Sample Collection');
    } catch (error) {
      throw new Error(`Retrieving Postman collection failed: ${error.message}`);
    }
  });
});
