# tsexample

This is a simple guide on how to use this repository.

## Prerequisites

This project uses [Bun](https://bun.sh) as its runtime and package manager. Install it from https://bun.sh.

## Installation

Install the necessary dependencies:
```bash
bun install
```

## Running

There are several scripts defined in the package.json file that can be used to interact with this project:

 - `bun run start`: This command will start the server by running the TypeScript source directly (no build step needed).
 - `bun run typecheck`: This command will run the TypeScript compiler to check for type errors without emitting output.
 - `bun run lint`: This command will run ESLint and tell you if there are any problems with the project.
 - `bun run lint-fix`: This command will run ESLint and automatically fix any fixable problems.
 - `bun run test`: This command will run the unit tests using Vitest.
 - `bun run int-test`: This command will run the integration tests using Postman (see the Integration Tests section below).

All commands work cross-platform (Linux, macOS, and Windows).

If your situation allows for it, I would highly recommend using a debugger in place of the above commands. This requires the [Bun for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode) extension. Here is an example launch.json which will work in VSCode/Cursor. To use it, simply click `Run -> Add Configuration`, then delete everything from the launch.json file and paste in the JSON below.
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "bun",
      "request": "launch",
      "name": "Debug Server",
      "program": "${workspaceFolder}/src/index.ts",
      "stopOnEntry": false
    },
    {
      "type": "bun",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/.bin/vitest",
      "args": ["run"],
      "stopOnEntry": false
    }
  ]
}
```

## Integration Tests

To run the integration tests, create a file called `.integration-test-env` in the project root and define the following variables:
```bash
export POSTMAN_API_KEY='your-api-key'
export POSTMAN_COLLECTION='your-collection'
```

Then run:
```bash
bun run int-test
```

On Windows (PowerShell):
```bash
bun run win-int-test
```

This requires the [Postman CLI](https://learning.postman.com/docs/postman-cli/postman-cli-overview/) to be installed.

## Postman Demo

Import `postman/Demo.postman_collection.json` into postman, and test away!

## Demo

There are only 2 endpoints for demo purposes

POST User
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Test User", "email":"testuser@example.com"}' http://localhost:5001/api/user
```

GET User
```bash
curl -X GET http://localhost:5001/api/user/12345
```
