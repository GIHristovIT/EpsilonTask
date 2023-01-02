<script setup>
import { useMainStore } from '../../stores/MainStore';
import Cables from '../EpsilonTask/Cables.vue';
import Jobs from '../EpsilonTask/Jobs.vue';
import Devices from '../EpsilonTask/Devices.vue';
import PromptUser from '../EpsilonTask/Dialog.vue';

const DataStore = useMainStore()
const devicesStore = DataStore.initialState
</script>

<template>
    <div>
        <PromptUser />
        <Devices />
        <div style="display:flex; justify-content: space-evenly;">
            <Jobs />
            <Cables />
        </div>
    </div>
</template>
