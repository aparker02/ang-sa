# My steps to install

create new project

copy index.html from smart admin ng2-blank

copy src/assets/css folder from ng2-blank to new project

install 3rd party libraries
```shell

npm install --save jquery amcharts google-maps bootstrap golden-layout

npm install --save-dev @types/jquery @types/amcharts @types/google-maps @types/bootstrap

```
Read here about adding custom typings [ custom typings ](https://www.bennadel.com/blog/3169-adding-custom-typings-files-d-ts-in-an-angular-2-typescript-application.htm)

Create panels component and copy from previous project

When using golden-layout, make sure to add link to external files in angular-cli.json.  If the cli is running,
restart it.


This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
