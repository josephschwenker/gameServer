"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _List_list;
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(list) {
        _List_list.set(this, void 0);
        if (list === undefined) {
            __classPrivateFieldSet(this, _List_list, new Array(), "f");
        }
        else {
            __classPrivateFieldSet(this, _List_list, [...list], "f");
        }
    }
    add(item) {
        __classPrivateFieldGet(this, _List_list, "f").push(item);
    }
    getById(id) {
        return __classPrivateFieldGet(this, _List_list, "f").find((item) => item.id === id);
    }
    filter(f) {
        return new List(__classPrivateFieldGet(this, _List_list, "f").filter((T) => Boolean));
    }
}
_List_list = new WeakMap();
exports.default = List;
