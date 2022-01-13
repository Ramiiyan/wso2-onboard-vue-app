<template>
  <v-container>
    <div class="text-h3" align="center"> Doctor Portal </div>
    {{ this.res }}
    <v-container id="profile">
      
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="patientFieldId" label="Patient Id" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn color="primary" dark class="mb-2" @click="getData">
            get Data
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" > <v-col>Patient Name : {{ this.patientData.name }} </v-col> </v-row>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="medicalRecords"
        sort-by="calories"
        class="elevation-3"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Medical Records</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Record
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.id"
                      label="Medical Record Id"
                    ></v-text-field>
                  </v-col> -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.medicineCode"
                          label="Medical Code"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.doctorId"
                          label="Doctor Id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.amount"
                          label="Amount"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.date"
                          label="Date"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="520px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this record?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-spacer></v-spacer>
          <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    patientFieldId: "",
    res: "",
    dialog: false,
    dialogDelete: false,
    patientData: {
      id: "",
      name: "",
    },
    headers: [
      {
        text: "Medical Record Id",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "medCode", value: "medicineCode" },
      { text: "doctorId", value: "doctorId" },
      { text: "amount", value: "amount" },
      { text: "date", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    medicalRecords: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      medicineCode: "",
      doctorId: "",
      amount: 0,
      date: "",
    },
    defaultItem: {
      id: "",
      medicineCode: "",
      doctorId: "",
      amount: 0,
      date: "",
    },
    // token: "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSUpUWjg3RjJNa3ZRbE1fOFM3U0d2MUFhX09ZYSIsIm5iZiI6MTYzNjA4OTQ0NiwiYXpwIjoiSUpUWjg3RjJNa3ZRbE1fOFM3U0d2MUFhX09ZYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTYzNjEyNTQ0NiwiaWF0IjoxNjM2MDg5NDQ2LCJqdGkiOiI0ZGMxYTM4MS03YTgxLTRiYjItYTQ1Mi0xMTJjODQ5YzQ1MTYifQ.mkS2H6TmAbEryJ2RYkIKEsyhqU5JeCRBAkTaqPrZAgEDq-JMkSZd4M6d6oVshuw36ou0MutvS6kW87eX0Bchn114LjhBbFfiYmk1--yCnhhzVqZuVEmIpccC54tRPfxRdOsvPN1jQqgsSt1y9E3DnoyX2AROFLTEUSv5JAGhrnLXIS_ovF5z0Ilq6AJX8Gu7rNn2SSQ05sBu3_I-OinL-jgsf2YtFiZooG3APuLNnCamWrvoPqXAsH_aOl8LrAmuQihx9rlhyQ9RSYzECYDKALpefUlIIxiUGGLP4gKU8o6H40FAb7x5a2lTn5n38MQClqQO_Wlojcw8CqN26e51OA",
    // docToken: 'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSUpUWjg3RjJNa3ZRbE1fOFM3U0d2MUFhX09ZYSIsIm5iZiI6MTYzNTg4MzcxMywiYXpwIjoiSUpUWjg3RjJNa3ZRbE1fOFM3U0d2MUFhX09ZYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTYzNTg4NzMxMywiaWF0IjoxNjM1ODgzNzEzLCJqdGkiOiJhMzg5ZjQ4NC1jODE2LTRjZDEtYjMxMC1iODg4ZTIzZTZjMDkifQ.bngQud9DyCYZEAsZijQdbzRvQiwHitb7npO1bT5EZqatbXRGFe3qPjINAx2aGLY7yXNZBoaJ6hFLz0SKwTW28dpQWtEPo-lZg369Dzhy05JJDmpEyGDTbYyE1q5KUGi3SOy72tjvNd3gHMl5HrNvoyyOy8ZWoD4yCKfjhED27agGZD47poxxu8-FqK1Jr7c5oLWhlmJRjBcVT_8vnFS4SdbQkSxEoaWlXugi3Ec1PqbL1XSfmLUUHNv6IzAlaGdkrrT6bz44tsZ6qJwcdeQ3VjH9cQFGMjBp7NwYYRKFqGRA4HW0XXKB6QoAWqwA7NHghsSE5HY1Wmsj8-tZxQm1Ng',
  }),
  props: ["token"],

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Medical Record" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    // this.initialize();
    this.getData();
    // this.getToken();
  },

  methods: {
    initialize() {
      // RAW data For Testing
      this.medicalRecords = [
        {
          id: "84ae8c03-f887-4bf6-81fb-6f01314fc0d2",
          medicineCode: "A1",
          doctorId: "789f7dc0-cf86-4da0-8267-9042a8ae4dda",
          amount: 20,
          date: "05/29/2021",
        },
        {
          id: "da0b0f30-05b1-4618-9b00-50171e5c761f",
          medicineCode: "P1",
          doctorId: "789f7dc0-cf86-4da0-8267-9042a8ae4dda",
          amount: 20,
          date: "05/29/2021",
        },
        {
          id: "35829f4a-e025-4559-9b2b-7b3619703727",
          medicineCode: "N1",
          doctorId: "789f7dc0-cf86-4da0-8267-9042a8ae4dda",
          amount: 20,
          date: "05/29/2021",
        },
      ];
    },
    async getToken() {
      // const username = 'IJTZ87F2MkvQlM_8S7SGv1Aa_OYa';
      // const password = '969pZ6XfY5KiEAXLFFo_pzjo1Nca';
      // const basicAuthToken = Buffer.from(`${username}:${password}`).toString('base64');
      // const basicAuthToken = Buffer.from('IJTZ87F2MkvQlM_8S7SGv1Aa_OYa:969pZ6XfY5KiEAXLFFo_pzjo1Nca').toString('base64');

      const body = new URLSearchParams();
      body.append("grant_type", "client_credentials");

      const config = {
        headers: {
          Authorization:
            "Basic SUpUWjg3RjJNa3ZRbE1fOFM3U0d2MUFhX09ZYTo5NjlwWjZYZlk1S2lFQVhMRkZvX3B6am8xTmNh",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      console.log("getting Token");
      await this.axios
        .post("https://localhost:8244/token", body, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error");
          console.error(error.status);
        });
    },
    async getData() {
      var patientId = this.patientFieldId;
      await this.axios
        .get("https://localhost:8244/health-first/1.0.0/patient/" + patientId, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.res = response.data;
          this.patientData = {
            id: response.data.id,
            name: response.data.name,
          };
          this.medicalRecords = Object.values(response.data.medicalRecords);
        })
        .catch((error) => {
          console.log("Error");
          console.error(error);
        });
    },
    // Add new Record - Doctor Only
    async addRecord(body) {
      const patientId = this.patientData.id;
      const config = {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      };
      console.log("MediRecode");
      console.log(body);
      const body2 = {
        medicineCode: body.medicineCode,
        amount: body.amount,
        date: body.date,
        doctorId: body.doctorId,
      };

      await this.axios
        .post(
          "https://localhost:8244/health-first/1.0.0/patient/" +
            patientId +
            "/history",
          body2,
          config
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error");
          console.error(error);
        });
    },
    // Delete Record - Doctor Only
    async deleteRecord(recordId) {
      const patientId = this.patientData.id;
      const config = {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      };
      await this.axios
        .delete(
          "https://localhost:8244/health-first/1.0.0/patient/" +
            patientId +
            "/history/" +
            recordId,
          config
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error");
          console.error(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.medicalRecords.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.medicalRecords.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(
        "Deleted Record id:" + this.medicalRecords[this.editedIndex].id
      );
      this.deleteRecord(this.medicalRecords[this.editedIndex].id);
      // this.medicalRecords.splice(this.editedIndex, 1);
      
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.getData();
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.medicalRecords[this.editedIndex], this.editedItem);
      } else {
        console.log("New Record Added");
        this.medicalRecords.push(this.editedItem);
        this.addRecord(this.editedItem); // add medical record resource
        this.getData(); // calling get-patient by id
      }
      this.close();
    },
  },
};
</script>
