<template>
  <v-app>
    <v-app-bar app v-if='this.$route.path !== "/login"'>
      <v-toolbar-title class="headline text-uppercase"> Health-First Hospital  
        <span class="font-weight-light"> APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>
          <router-link to="/">Login</router-link>
        </v-btn>
        <v-btn text @click="idplogout" > 
          Logout
        </v-btn>
        <v-btn text>
          <router-link to="/home">Home</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>



<script>
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      //
    };
  },
  methods:{
     idplogout(){
        window.location.href = 'https://localhost:9446/samlsso';
     }
  }
};
</script>