const fs = require('fs');
const path = require('path');
const { readOasFile } = require('../script');

describe('readOasFile', () => {
  it('should read and return the contents of an OAS file', () => {
    const testFile = path.join(__dirname, 'test-oas.yaml');
    fs.writeFileSync(testFile, 'openapi: 3.0.0\ninfo:\n  title: Test API\n');

    const contents = readOasFile(testFile);
    expect(contents).toContain('openapi: 3.0.0');
    expect(contents).toContain('title: Test API');

    fs.unlinkSync(testFile);
  });

  it('should throw an error if the file is not found', () => {
    expect(() => {
      readOasFile('nonexistent-file.yaml');
    }).toThrow('File not found');
  });
});
