<style>
  @import '../styles/JobsList.css'; 
  @import '../styles/CablesList.css'; 
</style>

<script setup>
import { useMainStore } from '../../stores/MainStore';
import { storeToRefs } from 'pinia';

const DataStore = useMainStore()
const {jobs} = storeToRefs(DataStore)
</script>

<template>  
 <!-- storeToRef allows me to include v-if clause to display the template. otherwide we get ref not initialized error      -->
    <div v-if="jobs.length>0" style="margin:10px" >
        <div class="jobsHeader">JOBS</div>
        <table id="jobsTable">
        <tr><th>Type</th><th>From</th><th>To</th><th>Status</th><th>Action</th></tr>
        <tr v-for="job in jobs" :key="job.id">                    
            <td>{{ job.type }}</td>
            <td>{{ job.from }}</td>
            <td>{{ job.to }}</td>
            <td>{{ job.status }}</td>
            <td >
                <!-- I use the same style for connect and disconnect to keep user in sync with what he is doing -->
                <div class="buttonContainer" v-if="job.status==='Pending'" @click="DataStore.completeJobOperation(job.id, job.type , job.from, job.to)">
                <button :class="{ buttonConnect: job.type ==='Connect', buttonDisconnect:job.type ==='Disconnect' }">{{job.type}}</button>
                </div>
            </td>
                                     
        </tr>
        </table>             
    </div>
</template>