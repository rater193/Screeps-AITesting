
var um = require("API.UnitManager");

module.exports = {
    handle: function(room) {
        var miners = um.getUnitsByRole("HarvesterMiner");
        var carriers = um.getUnitsByRole("HarvesterCarrier");
        var universals = um.getUnitsByRole("HarvesterUniversal");
        var sources = room.find(FIND_SOURCES);
        
        //Universal (Harvesters/carriers)
        for(var index in universals) {
            var creep = universals[index];
            
            if(creep.harvest(sources[0])==ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            
            
            if(creep.carry.energy < creep.carryCapacity) {
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                    });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
            
        }
        
        
        //Handleing miners
        for(var index in miners) {
            var miner = miners[index];
            if(miner.harvest(sources[0])==ERR_NOT_IN_RANGE) {
                miner.moveTo(sources[0]);
            }
            miner.drop(RESOURCE_ENERGY);
            console.log("test?");
        }
        
        //Handleing carriers
        for(var index in carriers) {
            var creep = carriers[index];
            if(creep.carry.energy<=0) {
                var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                    filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                
                if (dropenergy) {
                    if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropenergy)
                    }
                }
            }else{
                //if(Game.spawns.length > 0) {
                    if(creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.spawns["Spawn1"]);
                    }
                //}
            }
        }
        
        
    }
};