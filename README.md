# React Boilerplate

This is the JungleDevs boilerplate for React Applications. \
It uses React 16 + Redux + Reach Router.

## Requirements

- Node v10.17.0 installed
- [Yarn Package Manager](https://yarnpkg.com/lang/en/)

## Options Available

You can select to add:

- Storybook
- Express server with Server-side Rendering

## Setup

To use this boilerplate follow this steps:

- Clone this repository: `git clone https://github.com/JungleDevs/boilerplate-react.git PROJECT_NAME`
- Enter the recently created folder
- Run: `yarn`
- Run: `node setup.js` and follow the steps

## Running on development

- To run the application in development mode use the following command: `yarn start`

## Building the production

- In order to build the application for production use the command: `yarn build`. This will create a `build` folder.

## Terraform

Before start using terraform, you must have `aws-vault` properly configured, you can check more information on how to set up `aws-vault` [here](https://wiki.jungle.rocks/doc/set-up-aws-vault-qCufmyxfyB)

You also need to install terraform cli in your machine, this can be achieved by running the following command

```
brew install hashicorp/tap/terraform
```

Inside the terraform folder, open `locals.tf` file and update it to match your project name and arn certificate, after that, update the terraform bucket name on `state.tf`

Once you have everything installed and updated you should run `terraformSetup.sh`, this command will generate both `terraform.sh` and `init.sh` files.

In order to start your terraform project run `init.sh`, this will locally install terraform and create an S3 bucket to store terraform current state.

If you have multiple environments (staging/production) you must first select the appropriate workspace.

You can now run `apply.sh` and generate your aws infrastructure.

### Selecting workspaces

```
terraform workspace select [staging/production]
```

# About this boilerplate

### Base boilerplate

This boilerplate was made on top of [Facebook's Create React App (CRA)](https://github.com/facebook/create-react-app), making use of its already setup development server and production static build. We currently use the next build of CRA.

In order to customize the webpack, a script was added to listen and modify the original webpack configuration files. This is possible due to the library [Rewire](https://github.com/jhnns/rewire). The file responsible for this is located [here](scripts/customized-config.js)

### NVM

The _.nvmrc_ file helps us to run the project with the correct node version.
If you are not familiar with NVM usage, you can check it [here](https://coda.io/d/Chapter-Frontend_dPmePxjVB5S/Style-Guide_su751#_luWDD)

### Used Libraries

#### React

This boilerplate is currently in the version 16.4.1 of react, allowing the use of the newest [Portals](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202) and [Context](https://codeburst.io/what-can-react-context-api-do-for-you-multi-language-text-modals-and-theme-switchers-9cfbc8e5ee5e) APIs.

#### Redux

This boilerplate is also equipped with [Redux](https://github.com/reduxjs/redux) v4.

#### Router

We chose [reach-router](https://reach.tech/router) as a routing option for its simplicity.

#### Axios

[Axios](https://github.com/axios/axios) is the choice for making API requests. The boilerplate is already setup with the main configurations and is ready to work specially with Django BE Applications.

On implement the API requests (using our configurations) you could use some flags to handle automatically with your payload and response:

| Flag | Default | Description  |
| ----- |:-----:| ----- |
| transformPayload     | `true` | Transform to snake_case the request and camelCase the response  |
| transformOnlyRequest     | `false` |  Transform to snake_case only the request |
| transformOnlyResponse     | `false` | Transform to camelCase only the response |
| transformFormData     | `false` | Transform from normal object to FormData your request |
| removeTrailingSlash     | `false` | Remove the final slash in the request url |

For example, if I use the `transFormData = true` and my payload is `{ fooBar: 'The car' }`, the request should be like this:
```c
export const createPerfectBMW = payload =>
  post(['carros', 'marcas'], {
    transFormData: true,
  })

```
In this case the `transformPayload` is `true` by default, and will be applied together with the `transformFormData`. So you will have `{ foo_bar: 'The car'}`.

**You can use more than one flag like the example, but if you don't will convert to FormData in the request the flags to transform to snake_case doesn't it will work.**

#### Webpack

This boilerplate is equipped with [webpack v4](https://github.com/webpack/webpack).

### Development

To standardize Jungle Devs development, the boilerplate has installed [ESLint](https://eslint.org/), [Stylelint](https://github.com/stylelint/stylelint) and [Prettier](https://github.com/prettier/prettier).

For those who are using VS Code as the code editor, three extensions are required: `ESLint`, `stylelint` and `Prettier - Code formatter`. You can find the code formatting settings for VS Code below as well.

```JSON
{
  // Prettier
  "prettier.eslintIntegration": true,
  "prettier.stylelintIntegration": true,
  "prettier.printWidth": 180,
  "prettier.tabWidth": 2,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "prettier.bracketSpacing": true,
  "prettier.jsxBracketSameLine": false,
  "prettier.parser": "babylon",
  "prettier.semi": false,
  "prettier.proseWrap": "never",
  // ESLint
  "eslint.autoFixOnSave": true,
}
```

### Environments

Since this boilerplate is built on top of [CRA](https://github.com/facebook/create-react-app), all the env variables must have a REACT*APP* prefix. E.g.: REACT_APP_API_URL.

Files to store the environments can be created acording to the NODE_ENV used. For `development`, for e.g., we can create a file with the name `.env.development` and insert all our environment files there. Same goes for production: `.env.production`.
