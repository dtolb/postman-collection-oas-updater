const nock = require('nock');
const { updatePostmanCollection } = require('../script');

describe('updatePostmanCollection', () => {
  it('should successfully update a Postman collection', async () => {
    const collectionId = 'sample-collection-id';
    const collection = {
      info: {
        name: 'Updated Sample Collection',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      },
      item: [],
    };

    // Mock the Postman API response
    nock('https://api.getpostman.com')
      .put(`/collections/${collectionId}`)
      .reply(200, {
        collection: {
          info: {
            name: 'Updated Sample Collection',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
          },
          item: [],
        },
      });

    try {
      const response = await updatePostmanCollection(collectionId, collection);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('collection');
      expect(response.data.collection).toHaveProperty('info');
      expect(response.data.collection).toHaveProperty('item');
      expect(response.data.collection.info).toHaveProperty('name', 'Updated Sample Collection');
    } catch (error) {
      throw new Error(`Updating Postman collection failed: ${error.message}`);
    }
  });
});
