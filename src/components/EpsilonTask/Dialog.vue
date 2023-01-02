<!-- thats the popup component that prompts user to pick a coresponding port to connect -->
<style>
@import '../styles/Dialog.css';
</style>

<script setup>
import { useMainStore } from '../../stores/MainStore';
const DataStore = useMainStore()
</script>

<template>
    <div id="ac-wrapper" v-if="DataStore.connectionPhase === true">
        <div id="popup">
            <h2 class="center">Pick second port to connect</h2>
            <button id="cancelButton" @click="DataStore.cancelConnect()">Cancel</button>
        </div>
    </div>
</template>