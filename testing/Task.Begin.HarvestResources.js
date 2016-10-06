
var um = require("API.UnitManager");
var uaim = require("UnitAIManager");

module.exports = {
    Init:function() {
        
    },
    Update:function(room){
        var miners = um.getUnitsByRole("HarvesterMiner");
        var carriers = um.getUnitsByRole("HarvesterCarrier");
        
        if(miners.length<2) {
            um.createUnit(um.worktypes.worker, "HarvesterMiner");
        }
        if(carriers.length<1) {
            um.createUnit(um.worktypes.carrier, "HarvesterCarrier");
        }
        
        uaim.handle(room);
    }
};