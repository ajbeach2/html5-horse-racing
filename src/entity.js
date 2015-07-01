var Modifiers = require(('./component/modifiers'));

function Entity() {
    Entity.count = (Entity.count || 0) + 1;
    this.id = (+new Date()).toString() + Entity.count;
    this.components = {};
    this.modifiers =  new Modifiers();
}

Entity.prototype = {
    addComponent: function(component) {
        this.components[component.name] = component;
    },
    addKeyValue: function(key, value){
        this.components[key] = value;
    },
    removeComponent: function(componentName) {
        var name = componentName;
        delete this.components[name];
    },
    get: function(name){
        return this.components[name];
    },
    getModifiers: function(type) {
        return this.modifiers.getValues(type);
    },
    addModifier: function(type, key, value){
        this.modifiers.addModifier(type,key,value);
    },
    hasComponent: function(name) {
        return this.components.hasOwnProperty(name);
    }
};
module.exports = Entity;