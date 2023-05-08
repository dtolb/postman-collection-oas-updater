# OpenAPI to Postman Collection Updater

This script updates an existing Postman collection with an updated OpenAPI file. It reads the OpenAPI file, converts it to a Postman collection, and updates the specified Postman collection using the Postman API.

## Prerequisites

1. Node.js installed
2. A `.env` file with your Postman API key (POSTMAN_API_KEY)

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies

## Usage

	node index.js <OAS_FILE_PATH> <COLLECTION_ID>

Where:

- `<OAS_FILE_PATH>`: The path to your OpenAPI file
- `<COLLECTION_ID>`: The Postman collection ID you want to update

### Example

	node script.js 'petstore.yaml' '308093-acbc504c-c371-432f-b7e0-8f8afc0f5364'


This command will update the Postman collection with the specified ID using the OpenAPI file provided.

## Troubleshooting

If you encounter any issues, ensure that:

1. Your Postman API key is set correctly in the `.env` file
2. The OpenAPI file path is correct and the file is accessible
3. The Postman collection ID is correct and exists in your Postman account
