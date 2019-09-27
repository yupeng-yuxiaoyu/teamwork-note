<template>
  <div>
    <mavon-editor :value="value" defaultOpen="preview" :subfield="false" :toolbarsFlag="false" />
  </div>
</template>

<script>
  import io from "socket.io-client";
  export default {
    socket: null,
    data() {
      return {
        value: "",
      };
    },
    mounted() {
      this.$axios.get('http://localhost:3000/api/airticle', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.value = res.data.data.content;
      });
    },
  };
</script>

<style lang="less">
  html,
  body,
  #app,
  #app>div,
  .v-note-wrapper {
    height: 100%;
  }
</style>