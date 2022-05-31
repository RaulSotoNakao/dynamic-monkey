<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">{{ msg }}</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <v-btn elevation="2" @click="setDefaultPath()">setDefaultPath</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
  mounted() {
    // handle reply from the backend
    window.ipc.on("READ_FILE", (payload) => {
      console.log(payload.content);
    });
  },
  methods: {
    setDefaultPath() {
      window.ipc.send("READ_FILE", "chus");
    },
  },
};
</script>
