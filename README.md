# Wizzybot Assessment

This project is a chatbot API built with NestJS. It uses the OpenAI API to provide responses to user queries.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Santi-arcila/wizzybot-assessment.git
    cd wizzybot-assessment
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your API keys:

    ```sh
    cp .env.example .env
    ```

    Edit the [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FUsuario%2Fdev%2Fwizzybot-assessment%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\Usuario\dev\wizzybot-assessment\.env") file to include your OpenAI API key and Open Exchange API key.

## Running the Application

To run the application in a development environment, use the following command:

```sh
npm run start:dev
```

The application will start and listen on port 3000.

## API Documentation

The API documentation is available at http://localhost:3000/api once the application is running.

## Making a Request to the Chatbot Endpoint

To get a response from the chatbot, make a POST request to the /chatbot endpoint with the following payload:

### Request
* URL: http://localhost:3000/chatbot
* Method: POST
* Headers: Content-Type: application/json
* Body: 
```JSON 
{
  "query": "I want a phone"
}
```
### Response
* Status: 200 OK
* Body:
```JSON {
  "response": "I found a couple of phone options for you:\n\n1. [iPhone 12](https://wizybot-demo-store.myshopify.com/products/iphone-12)\n   - Price: $900.0 USD\n   - Colors available: Black, Blue, Red, Green, White\n   - Capacity options: 64gb, 128gb\n   - Discount: 1%\n\n2. [iPhone 13](https://wizybot-demo-store.myshopify.com/products/iphone-13)\n"
}
```
### Error Response
* Status: 400 Bad Request
* Body:
```JSON
{
  "message": "Error message",
  "error": "Bad Request",
  "statusCode": 400
}
```
## License
This project is licensed under the UNLICENSED License.