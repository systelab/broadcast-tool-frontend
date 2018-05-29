# broadcast-tool-frontend

This project is the front-end of the Broadcast Tool application. 

Is an Angular app and contains the following functionality:

1. Public and Private Wall of contents
2. Public Viewer
3. Private area to manage the content.

## Getting Started

To get you started you can clone the `broadcast-tool-frontend` repository and install the dependencies.

### Prerequisites

You need [git][git] to clone the `broadcast-tool-frontend` repository.

You will need [Node.js][node] and [npm][npm].

### Clone `broadcast-tool-frontend`

Clone the `broadcast-tool-frontend` repository using git:

```bash
git clone https://github.com/systelab/broadcast-tool-frontend.git
cd broadcast-tool-frontend
```

### .Net Core Back-end

The actual version uses a RESTFul API REST developed in .NET Core. 

Clone the [back-end][backend] before execute this front-end.

Set the `BASE_PATH` of the API in the [environment][environment] file.


### Install Dependencies

To install the dependencies you must run:

```bash
npm install
```
### Run

To run the application use the following command:

```bash
ng serve
```

## Test

The tests are not implemented yet, but maybe you can help us to implement the automated tests for the app!

[environment]:https://github.com/systelab/broadcast-tool-frontend/blob/master/src/environments/environment.ts
[backend]: https://github.com/systelab/broadcast-tool-backend
[git]: https://git-scm.com/
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
