## LeoCalendarApp
Calendar single page app made with VueJS and nuxtJS, working with a nodeJS API and a mongoDB database.

## Pre-required
Node v10.16.3
Yarn v1.13.0

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev


# build for production and launch server, available at localhost:3000
$ yarn run build
$ yarn start
```
## Structure
The project follows the standard [Nuxt structure](https://nuxtjs.org/guide/directory-structure). With some additions:

## Plugins

Here is a list of the plugins installed and used:

- _calendar-vue.js_: A calendar component ([Documentation](https://github.com/altinselimi/kalendar))
- _axios.js_: A library for making HTTP calls ([Documentation](https://github.com/axios/axios))

## Store

Nuxt uses [Vuex](https://vuex.vuejs.org/) for state management. The stores are divided by domains, which are most of the time closes to pages themselves. This is where every call to the API should be made. Components can use the _asyncData_ property to call actions on the server side.

## Adding a page

Pages in Nuxt are just Vue components that must be defined in _pages_ with their corresponding name. For more details on that subject, please read the Nuxt documentation. This section will list some useful advices and rules to follow if you intend to add a new page to the Lucette front application.