<template>
  <v-app id="login">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-account"
                              name="login"
                              label="Login"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              v-model="password"
                              id="password"
                              prepend-icon="mdi-lock"
                              :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="pwdShow ? 'text' : 'password'"
                              name="password"
                              label="Password"
                              @click:append="pwdShow =!pwdShow"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn block color="primary" to="/">Login</v-btn>
                     </v-card-actions>
                     <v-divider></v-divider>
                     <v-card-actions>
                        <v-btn block color="#E53935" @click="idpLogin"> WSO2 IS Login </v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
  data: () => ({
      pwdShow: false,
      password: 'dasd',
  }),
  methods:{
     idpLogin(){
        window.location.href = 'http://localhost:8080/login';
     }
  }
  
}
</script>
