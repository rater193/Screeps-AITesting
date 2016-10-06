
var um = require("API.UnitManager");
var uaim = require("UnitAIManager");

module.exports = {
    Init:function() {
        
    },
    Update:function(room){
        var universals = um.getUnitsByRole("HarvesterUniversal");
        
        if(universals.length<1) {
            um.createUnit(um.worktypes.workercarrier, "HarvesterUniversal");
        }else{
            room.memory.state = "Begin-Harvest";
            console.log("Switching to primary harvest state");
        }
        uaim.handle(room);
    }
};