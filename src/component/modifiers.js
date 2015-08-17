// Modifier component that is a further abstraction 
// for arbitrary attributes for an entity.

function Modifiers() {
    this.data = {};
}
Modifiers.prototype = {
    addModifier: function(type, key, value) {
        if(!this.data[type]){
            this.data[type] = {};
        }
        this.data[type][key] = value;
    },
    getValues: function(type){
        return this.data[type];
    },
    deleteModifer: function(type,key) {
        delete this.data[type][key];
    },
    types: function(){
        return Object.keys(this.data);
    }
};

Modifiers.prototype.name = 'modifiers';
module.exports = Modifiers;