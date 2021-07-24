<template>
  <Home />
</template>

<script>
import { reactive, toRefs } from "vue";
import Home from "./components/Home.vue";
import { useStore } from "vuex";

export default {
  components: {
    Home,
  },
  setup() {
    const store = useStore();
    const data = reactive({});
    (function () {
      store.commit("SET_ITEMSCOPY", store.state.items);
    })();

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
  box-sizing: border-box;
}
</style>
