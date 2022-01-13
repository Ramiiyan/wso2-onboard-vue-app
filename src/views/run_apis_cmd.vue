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
                    @click:append="pwdShow = !pwdShow"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" to="/">Login</v-btn>
              </v-card-actions>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn block color="#E53935" @click="looper">
                  WSO2 IS Login
                </v-btn>
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
    password: "dasd",
  }),
  methods: {
   async looper(){
      for(var i=2; i < 400; i++){
         this.idpLogin(i);
      }
   },
    async idpLogin(n) {
      console.log("Test.1");
      const config = {
        headers: {
          Authorization: "Basic YWRtaW46YWRtaW4=",
          "Content-Type": "application/json",
        },
      };
      await this.axios
        .post("https://localhost:9443/api/am/publisher/v1/apis", this.data(n), config)
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


    data(n) {
      return {
        name: "Test_" + n,
        description:
          "This is a simple API for Pizza Shack online pizza delivery store.",
        context: "test" + n,
        version: "1.0.0",
        provider: "admin",
        lifeCycleStatus: "CREATED",
        wsdlInfo: {
          type: "WSDL",
        },
        responseCachingEnabled: true,
        cacheTimeout: 300,
        destinationStatsEnabled: "Disabled",
        hasThumbnail: false,
        isDefaultVersion: false,
        enableSchemaValidation: false,
        enableStore: true,
        type: "HTTP",
        transport: ["http", "https"],
        tags: ["pizza", "food"],
        policies: ["Unlimited"],
        apiThrottlingPolicy: "Unlimited",
        authorizationHeader: "Authorization",
        securityScheme: ["oauth2"],
        maxTps: {
          production: 1000,
          sandbox: 1000,
        },
        visibility: "PUBLIC",
        visibleRoles: [],
        visibleTenants: [],
        endpointSecurity: {
          type: "BASIC",
          username: "admin",
          password: "password",
        },
        gatewayEnvironments: ["Production and Sandbox"],
        deploymentEnvironments: [
          {
            type: "Kubernetes",
            clusterName: ["minikube"],
          },
        ],
        labels: [],
        mediationPolicies: [
          {
            name: "json_to_xml_in_message",
            type: "in",
          },
          {
            name: "xml_to_json_out_message",
            type: "out",
          },
          {
            name: "json_fault",
            type: "fault",
          },
        ],
        subscriptionAvailability: "CURRENT_TENANT",
        subscriptionAvailableTenants: [],
        additionalProperties: {
          property1: "string",
          property2: "string",
        },
        monetization: {
          enabled: true,
          properties: {
            property1: "string",
            property2: "string",
          },
        },
        accessControl: "NONE",
        accessControlRoles: [],
        businessInformation: {
          businessOwner: "businessowner",
          businessOwnerEmail: "businessowner@wso2.com",
          technicalOwner: "technicalowner",
          technicalOwnerEmail: "technicalowner@wso2.com",
        },
        corsConfiguration: {
          corsConfigurationEnabled: false,
          accessControlAllowOrigins: ["string"],
          accessControlAllowCredentials: false,
          accessControlAllowHeaders: ["string"],
          accessControlAllowMethods: ["string"],
        },
        workflowStatus: "APPROVED",
        createdTime: "2022-01-06T10:34:01.481Z",
        lastUpdatedTime: "2022-01-06T10:34:01.481Z",
        endpointConfig: {
          endpoint_type: "http",
          sandbox_endpoints: {
            url: "https://localhost:9443/am/sample/pizzashack/v1/api/",
          },
          production_endpoints: {
            url: "https://localhost:9443/am/sample/pizzashack/v1/api/",
          },
          endpoint_security: {
            sandbox: {
              password: null,
              tokenUrl: "http://localhost:9443/token",
              clientId: "cid123",
              clientSecret: "cs123",
              customParameters: {},
              type: "OAUTH",
              grantType: "CLIENT_CREDENTIALS",
              enabled: true,
              username: null,
            },
            production: {
              password: null,
              tokenUrl: "http://localhost:9443/token",
              clientId: "cid123",
              clientSecret: "cs123",
              customParameters: {},
              type: "OAUTH",
              grantType: "CLIENT_CREDENTIALS",
              enabled: true,
              username: null,
            },
          },
        },
        endpointImplementationType: "INLINE",
        scopes: [
          {
            scope: {
              name: "apim:api_view",
              displayName: "api_view",
              description: "This Scope can used to view Apis",
              bindings: ["admin", "Internal/creator", "Internal/publisher"],
            },
            shared: true,
          },
        ],
        operations: [
          {
            target: "/order/{orderId}",
            verb: "POST",
            authType: "Application & Application User",
            throttlingPolicy: "Unlimited",
          },
          {
            target: "/menu",
            verb: "GET",
            authType: "Application & Application User",
            throttlingPolicy: "Unlimited",
          },
        ],
        threatProtectionPolicies: {
          list: [
            {
              policyId: "string",
              priority: 0,
            },
          ],
        },
        categories: [],
      };
    },
  },
};
</script>
