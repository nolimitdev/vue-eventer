'use strict';

class VueEventer {
    constructor(){
        this.events = {};
    }

    on(event, func) {
        this.events[event] = this.events[event] || [];
        this.events[event].push({ func : func, once : false });
    }

    $on(event, func) {
        this.on(event, func);
    }

    once(event, func) {
        this.events[event] = this.events[event] || [];
        this.events[event].push({ func : func, once : true });
    }

    $once(event, func) {
        this.once(event, func);
    }

    off(event, func) {
        if (this.events[event]) {
            for (var i = 0; i < this.events[event].length; i++) {
                if (this.events[event][i].func === func) {
                    this.events[event].splice(i, 1);
                    break;
                }
            };
        }
    }

    $off(event, func) {
        this.off(event, func);
    }

    emit(event, ...args) {
        (this.events[event] || []).forEach((item) => {
            if (item.once) {
                this.off(event, item.func);
            }
            item.func(...args);
        });
    }

    $emit(event, ...args) {
        this.emit(event, ...args);
    }
}

export default VueEventer;
