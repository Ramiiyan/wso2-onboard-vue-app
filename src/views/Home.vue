<template>
  <v-container>
    <div v-if="accessToken != ''">
      <admin-home v-if="scope == 'Hospital_Admin'" :token="this.accessToken" />
      <patient-home v-if="scope == 'Hospital_Patient'" :token="this.accessToken" />
      <doctor-home v-if="scope == 'Hospital_Doctor'" :token="this.accessToken" />
    </div>
  </v-container>
</template>

<script>
  import AdminHome from '../components/Admin-Home.vue'
  import DoctorHome from '../components/Doctor-Home.vue'
  import PatientHome from '../components/Patient-Home'
    export default {
      name: 'Home',

      components: {
        PatientHome,
        AdminHome,
        DoctorHome,
      },
      data:()=> {
        return{
          scope: '',
          accessToken : '',
          

        }
      },
      created(){
        this.getAccessToken();
      },
      methods:{
        // Used to get access token from saml Asserstion.
        async getAccessToken(){
          // const header = {
          //   headers:{
          //     Authorization: 'Bearer ' + this.token
          //   }
          // };
          await this.axios.get("http://localhost:8080/api/saml/accessToken").then((response) => {
            console.log(response);
            if(response.status == 200 && response.data.access_token){
              this.accessToken = response.data.access_token;
              this.scope = response.data.scope;
              console.log(this.scope);
              
            }else{
              console.log(response.data.error);
              window.location.href = 'http://localhost:8080/login';
            }
            
          }).catch(error => {
            console.error(error);
          });
        },
      }
    }
</script>
