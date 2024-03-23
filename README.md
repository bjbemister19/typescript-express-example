# tsexamp

This is a simple guide on how to use this repository.

## Installation

Install the necessary dependencies:
```bash
npm install
```

## Running

There are several scripts defined in the package.json file that can be used to interact with this project:

 - `npm run build`: This command will clean the project (remove the dist directory) and then compile the TypeScript code into JavaScript using the TypeScript compiler.
 - `npm run start`: This command will first build the project and then start it by running the compiled JavaScript code.
 - `npm run clean`: This command will remove the dist directory.
 - `npm run lint`: This command will run ESLint and tell you if there are any problems with the project

Note for Windows (Powershell) Users. The build, start and clean commands above will only work on unix like envitonments, or WSL. If you are using powershell please use the equivilent commands below:
 - `npm run win-build`
 - `npm run win-start`
 - `npm run win-clean`

When testing this myself, I also had to run the following command to allow my machine to run scripts from the command line. Understand the risks before running this command.
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

If your situation allows for it, I would highly recommend using a debugger in place of the above commands, here is an example launch.json which will work in VSCode. To use it, simply click `Run -> Add Configuration`. Select `Node.js` from the list, this will open a text editor. Delete everything from the launch.json file, and paste in the JSON below.
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