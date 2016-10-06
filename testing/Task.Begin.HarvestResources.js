
var um = require("API.UnitManager");
var uaim = require("UnitAIManager");

module.exports = {
    Init:function() {
        
    },
    Update:function(){
        var miners = um.getUnitsByRole("HarvesterMiner");
        var carriers = um.getUnitsByRole("HarvesterCarrier");
        var universals = um.getUnitsByRole("HarvesterUniversal");
        
        if(universals.length<2) {
            um.createUnit(um.worktypes.workercarrier, "HarvesterUniversal");
        }
        
        uaim.handle();
    }
};