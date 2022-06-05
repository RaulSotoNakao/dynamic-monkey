<template>
  <div>
    <v-btn class="mx-2" fab dark large color="purple" @click="get">
      <v-icon dark> mdi-android </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    get() {
      window.ipc.send("SELECT_DIRECTORY");
    },
  },
};
</script>

<style></style>
