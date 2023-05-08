const { preparePostmanRequest } = require('../script');

describe('preparePostmanRequest', () => {
  it('should return a properly formatted request object', () => {
    const input = {
      info: {
        name: 'Test API',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      },
      item: [],
    };

    const output = preparePostmanRequest(input);

    const expectedOutput = JSON.stringify({
      collection: {
        info: {
          name: 'Test API',
          schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        },
        item: [],
      },
    });

    expect(output).toEqual(expectedOutput);
  });
});
