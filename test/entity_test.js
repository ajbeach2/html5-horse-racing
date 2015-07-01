var assert = require("assert")
var Entity = require("../src/entity")

describe('Entity', function() {
    var entity = new Entity();
    describe("components", function() {
        it('can add component', function() {
            var Test = function() {};
            Test.prototype.name = 'test';
            entity.addComponent(new Test())
            assert(true, entity.hasComponent('test'));
        })

        it('can add key value pair', function() {
            entity.addKeyValue('foo', 'bar')
            assert.equal('bar', entity.get('foo'));
        })

        it('can remove component', function() {
            entity.removeComponent('test');
            assert(!entity.hasComponent('test'));
        });
    });

    describe('modifiers', function() {
        entity.addModifier('horse', 'fat', 90);
        var mods = entity.getModifiers('horse');
        assert.deepEqual({
            fat: 90
        }, entity.getModifiers('horse'));
    });
});