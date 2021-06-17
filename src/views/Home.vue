<template>
  <div id="home">
    <div id="body"></div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/global/Footer.vue";

export default {
  name: "Home",

  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
#body {
  height: 1000px;
}
</style>
