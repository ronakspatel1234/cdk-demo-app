# UiCommonsNg6

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

**Table of contents**

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Packages](#packages)
- [Applications](#applications)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Further help](#further-help)

## Introduction

This project consists of scope packages each containing at least one or more than one reusable components. Each of these packages will be built and deployed seperately but under the same scope `@commons`(for example: `@commons/data-table`). This repo will hold such packages for Angular version 7.x.x.

## Prerequisites

This project would require the following packages installed globally in your system:

| Package Name     | Version |
| ---------------- | ------- |
| @angular/cli     | 7.0.1   |
| @nrwl/schematics | 7.1.1  |
| ng-packagr       | 3.0.6   |
| gulp             | ^4.0.0  |

## Packages

All the packages will reside under the `packages/` directory in the project's root directory. Follow the steps in the [document](http://103.249.120.58:3000/Confluence/generator-ui-commons/blob/develop/README.md#generate-a-new-package) to know how the packages can be generated here.

For instance, we have generated a package called `data-table` using the steps in the link above. The next step would be to add the configurations for the package in `angular.json` to register it as one of the apps.

```JSON

{
    "projects" : {
        "docs": {
            // some app configurations
        },
        "examples": {
            // app configs
        },
        "data-table": {
            "root": "packages/data-table",
            "sourceRoot": "packages/data-table/src",
            "projectType": "library",
            "prefix": "cmn",
            "architect": {
                "test": {
                "builder": "@angular-devkit/build-angular:karma",
                "options": {
                    "main": "packages/data-table/test.ts",
                    "tsConfig": "packages/data-table/tsconfig.spec.json",
                    "karmaConfig": "packages/data-table/karma.conf.js"
                }
                },
                "lint": {
                "builder": "@angular-devkit/build-angular:tslint",
                "options": {
                    "tsConfig": [
                    "packages/data-table/tsconfig.lib.json",
                    "packages/data-table/tsconfig.spec.json"
                    ],
                    "exclude": [
                    "**/node_modules/**"
                    ]
                }
                }
            }
        },
    }
}
```

The next file that has to be modified is `nx.json` in the root directory.

### nx.json

This file provides the implicit dependencies hence, we would want our package to added here.

```JSON
    "projects": {
        // every package has to be included here
        "data-table": {
        "tags": []
        },
        "docs": {
        "tags": []
        },
        "examples": {
        "tags": []
        }
    }
```

Follow the steps in the [document](http://103.249.120.58:3000/Confluence/generator-ui-commons/blob/develop/README.md#sub-generators) to know how the building-blocks can be generated here.

## Applications

All the applications for this project will reside under the `apps/` directory in the project's root directory. There are two applications namely `examples` and `docs` already created inside the `apps` folder. Each app is a seperate angular application which can be built and deployed in different environments. Use the command below to run these two apps in the browser:

```
ng serve --project=docs  // this will run the docs app in a default port 4200
ng serve --project=examples  // this will run the examples app in a default port 4200
```

Just like packages, To create the components inside the just hit the following command:

```
ng generate component data-table --project=examples
ng generate component data-table --project=docs
```

Since the application for this projects are fixed to `examples` and `docs`, they have been configured in the `angular.json` already.

## Build

### Building an application

Run `ng build --project=examples` to build `examples` application and `ng build --project=docs` to build the `docs` application. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Building a package

Package building will require following steps:

- Ensure that package's version is updated in it's `package.json` (i.e for a package named `data-table` it's `package.json` file would be inside `packages/data-table/` folder) file based on the npm's versioning technic.
- Add the following command to your script array in the project's `package.json` file (i.e, in the root folder).

```
"build:data-table": "ng-packagr -p ./packages/data-table/ng-package.js && gulp copy --package data-table && cd packages/data-table/dist && npm pack"
```

- Finally, run `npm run build:data-table` to package it.

## Running unit tests

Run `ng test --project=examples --watch` to execute tests in `examples` app, `ng test --project=docs --watch` to execute tests in `docs` app and `ng test --project=data-table --watch` for package name called `data-table` via [Karma](https://karma-runner.github.io).

**Note:** Don't forget to add `--watch` in the options.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
