# tsexamp

This is a simple guide on how to use this repository.

## Installation

Install the necessary dependencies:
```bash
npm install
```

## Running

There are several scripts defined in the package.json file that can be used to interact with this project:

 - `npm run test`: This command will echo the message "Error: no test specified" and then exit.
 - `npm run build`: This command will clean the project (remove the dist directory) and then compile the TypeScript code into JavaScript using the TypeScript compiler.
 - `npm run start`: This command will first build the project and then start it by running the compiled JavaScript code.
 - `npm run clean`: This command will remove the dist directory.
 - `npm run lint`: This command will run ESLint and tell you if there are any problems with the project

If you like using the debugger, here is an example launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/ts-node",
      "args": [
          "--files",
          "${workspaceFolder}/src/index.ts",
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": ["<node_internals>/**"]
    }    
  ]
}
```

## Demo

There are only 2 endpoints for demo purposes

POST User
```bash
curl -X POST -H "Content-Type: application/json" -d '{"id":2, "name":"Test User", "email":"testuser@example.com"}' http://localhost:5001/api/user
```

GET User
```bash
curl -X GET http://localhost:5001/api/user
```