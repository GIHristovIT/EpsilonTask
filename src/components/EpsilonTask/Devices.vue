<style>
  @import '../styles/DevicesList.css'; 
  @import '../styles/MainSetting.css';
</style>

<script setup>
import { useMainStore } from '../../stores/MainStore';

const DataStore = useMainStore()
</script>

<template>    
<div id="Devices" class="deviceCardWrapper" >        
    <div v-for="device in DataStore.initialState" :key="device.id" class="singleDevice" >
        <div class="deviceHeader">{{ device.deviceHeader }}</div>
        <table id="devTable">
        <tr><th>Port Name</th><th>Connected To</th><th>Cable</th><th>Action</th></tr>
        <tr v-for="port in device.ports" :key="port.pId">
            <td>{{port.portName}}</td>    
            <!--display the remote connection ELSE -> remove the dash-->
            <td v-if="port.connectedToDevice && port.connectedToDevice">{{port.connectedToDevice}}-{{port.connectedToPort}}</td>
            <td v-else></td>
            <td>{{port.cable}}</td>
            <!-- this is the cell for actions -->
            <td>       
                <!-- when there is no action applyed to the port.action property  then:-->
                <div v-if="port.action===null" class="buttonContainer">
                    <!-- the button is eighter ready to begin connection process -->
                <button v-if="port.waitConnect===false"  class="buttonConnect" @click="DataStore.connectDevice(device.deviceHeader, port.portName)">Connect</button>
                    <!-- or the connection phase has begun and it is the first picked port -->
                <div v-else :class="{ firstPickedPort: port.waitConnect===true }" >First Port</div>
                </div>        
                <!-- with DataStore.connectionPhase===false we show disconnect only if there is no active connection Phase          -->
                <div v-else-if="port.action==='Disconnect' && DataStore.connectionPhase===false" >
                <button butColor={port.action} @click="DataStore.disconnectDevice(port.cable)" class="buttonDisconnect">{{port.action}}</button>
                </div>
                <!-- with DataStore.connectionPhase===false we show Reserved only if there is no active connection Phase          --> 
                <div v-else-if="DataStore.connectionPhase===false" class="firstPickedPort">
                <div butColor={port.action} >{{port.action}}</div>
                </div>  
            </td>                              
        </tr>
        </table>             
    </div>    
</div>
</template>