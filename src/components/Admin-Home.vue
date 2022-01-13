<template>
  <v-container>
    <!-- Add New Patient to System -->
    <div class="text-h3" align="center"> Admin Portal </div>
    {{ this.res }}
    <v-container>
      <v-card>
        <v-card-title>Add New Patient</v-card-title>
        <v-form v-model="valid" ref="patientRegForm">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Patient Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" lg="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Date Of Birth"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- <v-btn class="mr-4" color="success" :disabled="!valid" @click="submit">
          submit
        </v-btn> -->
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4"
                  color="success"
                  :disabled="!valid"
                  @click="submit"
                  v-bind="attrs"
                  v-on="on"
                >
                  Submit
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  New Patient Created
                </v-card-title>
                <v-card-text>patient ID : {{ this.newPatientId }} </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="clear"> OK </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn @click="clear"> clear </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
    <!-- View & Delete Patient Account -->
    <v-container>
      <v-card class="mx-auto">
        <v-card-title>View/Delete Patient</v-card-title>
        <v-form v-model="validDel" ref="deleteForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="delWay"
                  dense
                  :rules="[() => !!delWay || 'This field is required']"
                  :items="delWays"
                  label="View By"
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  dense
                  v-model="delField"
                  :rules="[() => !!delField || 'This field is required']"
                  :label="formLabel"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn
                  color="primary"
                  :disabled="!validDel"
                  @click="viewPatient"
                >
                  View Profile
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <!-- Expand Profile View  -->
        <v-expand-transition>
          <div v-show="showProfile">
            <v-divider></v-divider>
            <v-card-title> Patient Profile </v-card-title>
            <v-card-subtitle>
              ID: {{ this.viewPatientData.id }}
            </v-card-subtitle>
            <v-card-text>
              Name : {{ this.viewPatientData.name }} <br />
              Email: {{ this.viewPatientData.email }} <br />
              DOB : {{ this.viewPatientData.dob }}
            </v-card-text>
            <v-card-actions>
              <!-- DELETE Btn & Dialg -->
              <v-dialog v-model="delDialog" persistent max-width="420">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-1" color="error" v-bind="attrs" v-on="on">
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h6">
                    Delete Patient Account
                  </v-card-title>
                  <v-card-text
                    >Are you sure you want to delete
                    {{ this.delField }} Account?<br />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="clearDel">
                      Cancel
                    </v-btn>
                    <v-btn color="red darken-1" text @click="deletePatient">
                      Delete Profile
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    res: "",
    valid: false,
    validDel: false,
    dialog: false,
    delDialog: false,
    showProfile: false,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      // v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    delWay: "ID",
    delWays: ["ID", "Email"],
    delField: "",
    newPatientId: "",
    viewPatientData: {
      id: "",
      name: "",
      email: "",
      dob: "",
    },
  }),
  props: ["token"],
  computed: {
    formLabel() {
      return this.delWay === "ID" ? "Enter ID" : "Enter Email";
    },
  },
  methods: {
    submit() {
      const [year, month, day] = this.date.split("-");
      const dob = `${month}/${day}/${year}`;
      if (this.$refs.patientRegForm.validate()) {
        const patientData = {
          name: this.name,
          dateOfBirth: dob,
          email: this.email,
        };
        console.log(patientData);
        this.addNewPatient(patientData);
      } else {
        this.valid = false;
      }
    },
    clear() {
      this.dialog = false;
      this.$refs.patientRegForm.reset();
    },
    clearDel() {
      this.delDialog = false;
      this.$refs.deleteForm.reset();
    },
    viewPatient() {
      const url = "https://localhost:8244/health-first/1.0.0/patient/";
      const search = "search?email=";
      if (this.delWay === "ID" && !this.showProfile) {
        this.viewPatientProfile(url + this.delField);
      } else if (this.delWay === "Email" && !this.showProfile) {
        this.viewPatientProfile(url + search + this.delField);
      }
      this.showProfile = !this.showProfile;
    },
    async addNewPatient(data) {
      console.log(this.token);
      const config = {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      };
      await this.axios
        .post("https://localhost:8244/health-first/1.0.0/patient", data, config)
        .then((response) => {
          console.log("Add Patient Res:");
          console.log(response);
          console.log(response.data);

          this.newPatientId = response.data.id;
        })
        .catch((error) => {
          console.log("Error");
          console.error(error);
        });
    },
    async viewPatientProfile(url) {
      const header = {
        headers: {
          "Authorization": "Bearer " + this.token,
          // scope: this.scope,
        },
      };
      await this.axios
        .get(url, header)
        .then((response) => {
          console.log(response);
          this.viewPatientData = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            dob: response.data.dateOfBirth,
          };
          this.res = response.data;
          this.delDialog = false;
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
    async deletePatient() {
      const config = {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      };
      await this.axios
        .delete(
          `https://localhost:8244/health-first/1.0.0/patient/${this.viewPatientData.id}`,
          config
        )
        .then((response) => {
          console.log(response.data);
          (this.viewPatientData = {
            id: "",
            name: "",
            email: "",
            dob: "",
          }),
            (this.delDialog = false);
        })
        .catch((error) => {
          console.log("Error");
          console.error(error);
        });
    },
  },
};
</script>