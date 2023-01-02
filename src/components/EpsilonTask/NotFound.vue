<!-- this little page is displayed when user is tring to reach invalid url in the same domain -->
<style>
 @import '../styles/HomeStyles.css';
 </style>
<script setup>
import {logoGoesUp, motionGlowText } from '../motions'  
</script>
<template>
     <div id="example"  v-motion="logoGoesUp">
        <img  src="@/components/icons/LogoEJPG.jpg" alt=""> 
        <div id="homeText" v-motion="motionGlowText">Page not found 404 </div>
    </div>   
  </template>