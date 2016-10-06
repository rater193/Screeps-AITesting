/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('API.UnitManager');
 * mod.thing == 'a thing'; // true
 */
 
var unitManager = {}

//These are some default work types you can use to create units
unitManager.worktypes = {}
unitManager.worktypes.worker             = [CARRY, WORK, WORK, MOVE];
unitManager.worktypes.carrier            = [CARRY, CARRY, MOVE, MOVE, MOVE];
unitManager.worktypes.workercarrier      = [WORK, CARRY, MOVE, MOVE, MOVE];
unitManager.worktypes.healer             = [HEAL, MOVE];
unitManager.worktypes.tankattacker       = [TOUGH, ATTACK, MOVE];
unitManager.worktypes.ranger             = [RANGED_ATTACK, MOVE];

unitManager.getUnitsByRole = function(roleName) {
    return _.filter(Game.creeps, (creep) => creep.memory.Role == roleName);
}

unitManager.createUnit = function(unitType, role) {
    for(var spawn in Game.spawns) {
        spawn = Game.spawns[spawn];
        spawn.createCreep(unitType, undefined, {Role: role})
    }
    
}

module.exports = unitManager;