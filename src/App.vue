<template>
  <Home />
</template>

<script>
import { reactive, toRefs } from "vue";
import Home from "./components/Home.vue";

export default {
  components: {
    Home,
  },
  setup() {
    const data = reactive({});

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap");
body {
  margin: 0;
  font-family: "Source Sans Pro", sans-serif;
  background: #f0f0f1;
}
</style>
