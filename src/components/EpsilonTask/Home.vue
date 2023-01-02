<style>
 @import '../styles/HomeStyles.css';
 </style>
<script setup>
import {logoGoesUp, motionGlowText } from '../motions'  
</script>
<template>
    <div id="example"  v-motion="logoGoesUp" @click="this.$router.push({path:'/devices'})">
        <img  src="@/components/icons/LogoEJPG.jpg" alt=""> 
        <div id="homeText" v-motion="motionGlowText">Epsilon’s strong telecom roots along with its ongoing innovation in software-defined technology and Infiny bring a true differentiator in the Network as a Service (NaaS) market.</div>
    </div>   
</template>


