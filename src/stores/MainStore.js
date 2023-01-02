import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'MainStore',
  state: () => ({
    connectionPhase: false,
    buildCable:null,
    cables: [],
    jobs: [],
    initialState: [
      {
          id: 1,
          deviceHeader: "A", ports: [{
              pId: 1,
              portName: "P1",
              connectedToDevice: null,
              connectedToPort: null,
              cable: null,
              action: null,
              waitConnect: false
          },
          {
              pId: 2,
              portName: "P2",
              connectedToDevice: null,
              connectedToPort: null,
              cable: null,
              action: null,
              waitConnect: false
          }]
      },
      {
          id: 2, deviceHeader: "B", ports: [{
              pId: 1,
              portName: "P1",
              connectedToDevice: null,
              connectedToPort: null,
              cable: null,
              action: null,
              waitConnect: false
          },
          {
              pId: 2,
              portName: "P2",
              connectedToDevice: null,
              connectedToPort: null,
              cable: null, //P3?
              action: null,
              waitConnect: false
          }]
      },
      {
          id: 3, deviceHeader: "C", ports: [{
              pId: 1,
              portName: "P1",
              connectedToDevice: null,
              connectedToPort: null,
              cable: null,
              action: null,
              waitConnect: false
          },
          {
              pId: 2,
              portName: "P2",
              connectedToDevice:null,
              connectedToPort: null,
              cable: null,
              action: null,
              waitConnect: false
          },
          {
              pId: 3,
              portName: "P3",
              connectedToDevice: null,
              connectedToPort: null,
              cable: null,
              action: null,
              waitConnect: false
          },
          {
            pId: 4,
            portName: "P4",
            connectedToDevice: null,
            connectedToPort: null,
            cable: null,
            action: null,
            waitConnect: false
        }]
      }]
  }),
  actions: {    
    connectDevice(deviceHeader, portName){  
      /*check if this is first click*/ 
      if (this.connectionPhase === false) {     
          this.buildCable = deviceHeader + "-" + portName;
          /*points that connection process has started */
      this.connectionPhase=true; 
      /*update relevant port with  correct stats*/
      this.updatePort(deviceHeader+"-"+portName,null,"waitParing")}        
  else {   
      let reserveFrom = this.buildCable 
      /*build he cable */
      this.buildCable = this.buildCable + "-" + deviceHeader+ "-" + portName;    
      /*mark the exit fom connection process */
        this.connectionPhase=false;
        /*insert new job */
        this.jobs.push({id : Math.max(...this.jobs.map(obj => obj.id)) === -Infinity? 1: Math.max(...this.jobs.map(obj => obj.id))+ 1,
        type:"Connect", from:reserveFrom, to:deviceHeader+"-"+portName, status: "Pending"})
        /*update relevant ports */
      this.updatePort(deviceHeader+"-"+portName,reserveFrom,"Reserved")         
      }        
},
cancelConnect(){  
     this.updatePort(this.buildCable,null, "Cancel Connect");
     this.connectionPhase = false
     this.buildCable=null
  },
    //Add pending job for Disconnect
    disconnectDevice(cableParam){     
      /*from cable param we make elements to insert in jobs*/ 
      let fromPart = cableParam.split('-').slice(0,1) + '-' + cableParam.split('-').slice(1,2)      
      let toPart=cableParam.split('-').slice(2,3) + '-' + cableParam.split('-').slice(3)
      this.updatePort(fromPart, toPart, "Reserved")
      this.jobs.push({id : Math.max(...this.jobs.map(obj => obj.id)) === -Infinity? 1: Math.max(...this.jobs.map(obj => obj.id))+ 1,
      type:"Disconnect", from:fromPart, to:toPart, status: "Pending"})      
  },

  updatePort(deviceDashPort, secondDashport, setStatus){
    /*find the relevant device */
    for( let i=0; i< arguments.length -1 ; i++) {
      if (arguments[i] !== null){
    const elementsIndex = this.initialState.findIndex(element => element.deviceHeader === arguments[i].split('-')[0]);
          let newDeviceArray = [...this.initialState]
          /*FIND THE RELEVANT PORT */
          let correctPort = newDeviceArray[elementsIndex].ports.find(port => port.portName === arguments[i].split('-')[1])
          if (setStatus === "Reserved") {       
          correctPort.action = "Reserved"} 
          else if (setStatus==="Cancel Connect"){
            correctPort.waitConnect=false; 
          }
          else if (setStatus === "Connect Complete") {
            /*we use the same operation for item.from and item.to*/
          let whereTo = this.jobs.find(item => item.from === arguments[i])
                if (whereTo !== undefined) {
          correctPort.cable = arguments[i] + "-" + whereTo.to
          correctPort.connectedToDevice = whereTo.to.split('-')[0]
          correctPort.connectedToPort = whereTo.from.split('-')[1]
          correctPort.waitConnect=false;
          correctPort.action = "Disconnect"
                } else
                {
          let whereFrom = this.jobs.find(item => item.to === arguments[i])
          correctPort.cable = whereFrom.from + "-" + arguments[i]
          correctPort.connectedToDevice = whereFrom.from.split('-')[0]
          correctPort.connectedToPort = whereFrom.to.split('-')[1]
          correctPort.waitConnect=false;
          correctPort.action = "Disconnect"           
                }
          }
          else if (setStatus === "Disconnect Complete") {
          correctPort.cable = null
          correctPort.connectedToDevice = null
          correctPort.connectedToPort = null
          correctPort.action = null
          }
          else if (setStatus === "waitParing") {
            correctPort.waitConnect = !correctPort.waitConnect  
          }
          /*update relevant port*/
          this.initialState[elementsIndex].ports[correctPort.pId-1] = correctPort 
        } 
      }
},

completeJobOperation (jobId, theType, fromParam, toParam){
  if (theType === "Connect"){
      /*insert the cable */
      this.cables.push({id : Math.max(...this.cables.map(obj => obj.id)) === -Infinity? 1: Math.max(...this.cables.map(obj => obj.id))+ 1,
      name:fromParam + "-" + toParam})  
      /*update relevant ports*/
      this.updatePort(fromParam, toParam, "Connect Complete")
  }
  //DISCONNECT
  else {//updadet rrelevant ports
        this.updatePort(fromParam, toParam, "Disconnect Complete")
       /*remove the cable*/         
     this.cables = this.cables.filter(function( obj ) {
      return obj.name !== fromParam + "-" + toParam;
});    
  }
  /*mark the job as completed */
  this.jobs[jobId-1].status="Completed"        
}
  } 
})