# Wizzybot Assessment

This project is a chatbot API built with NestJS. It uses the OpenAI API to provide responses to user queries.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
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