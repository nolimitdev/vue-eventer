# vue-eventer [![](https://img.shields.io/npm/v/vue-eventer.svg)](https://www.npmjs.com/package/vue-eventer)

Vue.js tool known as `event bus` or `even hub` usefull for small projects. Vue 3.x has a lot of breaking changes including removed `$on`, `$off` and `$once` methods so goodbye native event bus. Using this tool you can have the same code for event bus in Vue 2.x and Vue 3.x projects.

## Install

To install with npm or yarn, use

```shell
npm install --save vue-eventer

// or

yarn add vue-eventer
```

## Methods

Methods are compatible with Vue 2.x methods so you can easily switch from native event bus `Vue.prototype.$eventBus = new Vue()` to this tool `Vue.prototype.$eventBus = new VueEventer()` with no additonal code changes. Later you can again easily switch from Vue 2.x to Vue 3.x.

### $on(event, callback)

Adds listener for the event. The callback will receive all the additional arguments passed into `$emit()` method. You can also use alias method `on()`. Do no forget to always remove listeners in components which can be removed to avoid memory leaks!

### $once(event, callback)

Adds one-time listener for the event. The callback will receive all the additional arguments passed into `$emit()` method. The listener will be removed once it triggers for the first time. You can also use alias method `once()`. Do not forget to always remove listeners in components which can be removed to avoid memory leaks!

### $off(event, callback)

Removes listener for the event. You can also use alias method `off()`.

### $emit(event, [...args])

Emits event with or without any arguments. Any additional arguments will be passed into the listener’s callback function. You can also use alias method `emit()`.

## Usage

```js
////////// JS for Vue 2.x \\\\\\\\\\

import Vue from 'vue';
import VueEventer from 'vue-eventer';

Vue.prototype.$eventBus = new VueEventer();

const App = new Vue({
    el: '#app',

    created() {
        this.$eventBus.$on('do-sth', this.waitForSomething);
    },

    beforeDestroy() {
        this.$eventBus.$off('do-sth', this.waitForSomething);
    },

    methods : {
        waitForSomething(a, b) {
            console.log(a, b);
        },

        triggerSomething() {
            // this.$eventBus.$emit('do-sth', 123);
            // this.$eventBus.$emit('do-sth', 123, 456);
            // this.$eventBus.$emit('do-sth', { x : 1, y : 2 });
        },
    },
});
```

```js
////////// JS for Vue 3.x \\\\\\\\\\

import * as Vue from 'vue';
import VueEventer from 'vue-eventer';

const App = Vue.createApp({
    created() {
        this.$eventBus.$on('do-sth', this.waitForSomething);
    },

    beforeUnmount() {
        this.$eventBus.$off('do-sth', this.waitForSomething);
    },

    methods : {
        waitForSomething(a, b) {
            console.log(a, b);
        },

        triggerSomething() {
            // this.$eventBus.$emit('do-sth', 123);
            // this.$eventBus.$emit('do-sth', 123, 456);
            // this.$eventBus.$emit('do-sth', { x : 1, y : 2 });
        },
    },
});

App.config.globalProperties.$eventBus = new VueEventer();

App.mount('#app');
```
