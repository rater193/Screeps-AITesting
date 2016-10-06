
//These vars will update every loop
var hq, room;

//While these update to the memory
var state;

//tasks
var Task = {};

//Other required libs
var um = require("API.UnitManager");

//Beginning tasks
Task.Begin = {};
Task.Begin.HarvestResources = require("Task.Begin.HarvestResources");
Task.Begin.Research = require("Task.Begin.Research");
Task.Begin.CreateDefence = require("Task.Begin.CreateDefence");
Task.Begin.EndBeginPhase = require("Task.Begin.EndBeginPhase");

//Maintained tasks
Task.Maintained = {};
Task.Maintained.AttackSector = {};
Task.Maintained.AttackSector.Begin = require("Task.Maintained.AttackSector.Begin");
Task.Maintained.AttackSector.End = require("Task.Maintained.AttackSector.End");
Task.Maintained.AttackSector.Loop = require("Task.Maintained.AttackSector.Loop");

//Required libs
var qf = require("QuickFunctions");

function set_state(stateName) {
    state = stateName;
    room.memory.state = state;
    console.log("Switching state to "+stateName);
}


module.exports.loop = function () {
    //This will get the first spawn that is in the room
    for(var spawn in Game.spawns) {
        hq = Game.spawns[spawn];
        break;
    }
    if(hq) {
        //This gets the room itself
        room = hq.room;
        
        //Now to add the state to the room
        if(!room.memory["state"]) {
            room.memory.state = "Init";
        }
        state = room.memory.state;
        //test
        switch(state) {
            case "Init":
                //This initilizes the state of the room.
                set_state("Begin-Harvest");
                console.log("Initializing");
                Task.Begin.HarvestResources.Init(room);
                Task.Begin.CreateDefence.Init(room);
                Task.Begin.EndBeginPhase.Init(room);
                Task.Begin.Research.Init(room);
                Task.Maintained.AttackSector.Begin.Init(room);
                Task.Maintained.AttackSector.End.Init(room);
                Task.Maintained.AttackSector.Loop.Init(room);
            break;
            
            case "Begin-Harvest":
                //This does the initial harvest, so we will try to get more resources
                Task.Begin.HarvestResources.Update();
            break;
            
            case "Begin-Research":
                
            break;
            
            case "ALERT-DefendSector":
                set_state("Begin-Harvest");
            break;
            
            default:
                console.log("Unhandled state, "+state);
                Game.alert("Unhandled state, "+state);
                set_state("Init");
            break;
            
        }
    }else{
        console.log("The spawn doesnt exsist!");
    }
}