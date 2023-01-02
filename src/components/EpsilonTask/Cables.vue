<style>
 @import '../styles/MainSetting.css';
 </style>
<script setup>
import { useMainStore } from '../../stores/MainStore';
import { storeToRefs } from 'pinia';    
    const DataStore = useMainStore()
    //I use storeToRefs as cables did not update after filter in completeJobOperation row 167
    const {cables} = storeToRefs(DataStore)
</script>
<template>
    <!-- the component will be displayed only if there are cables connected -->
    <div v-if="cables.length > 0"> 
          <div id="CABLES" class="jobsWrapper" >        
            <div style="margin:10px" >
                <div class="cablesHeader">Connected Cables</div>
                <table>
                <tr><th>Cable</th><th>From</th><th>To</th></tr>
                <!-- we keep the cables component as simple as posible by using only name -->
                <tr v-for="cable in cables" :key="cable.id">                        
                            <td>{{ cable.name }}</td>
                            <td>{{ cable.name.split('-')[0] + '-'+ cable.name.split('-')[2]}}</td>
                            <td>{{ cable.name.split('-')[2] + '-'+ cable.name.split('-')[3]}}</td>                                                                                   
                </tr> 
                </table>             
            </div>        
        </div>  
    </div>
</template>


