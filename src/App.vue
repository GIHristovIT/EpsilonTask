
<template>  
  <div id="nav">
            <router-link class="linkEl" to="/">Home</router-link> |
            <router-link class="linkEl" to="/devices">Devices</router-link>         
  </div>
   <RouterView /> 
</template>

<style scoped>
/*style for nav container*/ 
 #nav {
  margin: 10px 10px 10px 10px; font-size: x-large;
 }

 /*initial look of Navlinks*/ 
 .linkEl {
  font-weight: 900; font-size:x-large
 }

 /* class provided by router by default on active*/
 .router-link-exact-active { 
  text-decoration: underline;
}
</style>