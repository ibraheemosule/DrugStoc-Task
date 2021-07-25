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
    const items = [
      {
        title: "one",
        tag: "Marketing & Sales",
        price: 40,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "two",
        tag: "deployment",
        price: 300,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "three",
        tag: "Marketing & Sales",
        price: 270,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "four",
        tag: "deployment",
        price: 180,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "five",
        tag: "deployment",
        price: 200,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "six",
        tag: "Marketing & Sales",
        price: 800,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "seven",
        tag: "deployment",
        price: 450,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "eight",
        tag: "deployment",
        price: 560,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "nine",
        tag: "deployment",
        price: 420,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "ten",
        tag: "deployment",
        price: 800,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "eleven",
        tag: "deployment",
        price: 200,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "twelve",
        tag: "deployment",
        price: 300,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "thirteen",
        tag: "deployment",
        price: 330,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "fourteen",
        tag: "deployment",
        price: 700,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "fifteen",
        tag: "deployment",
        price: 100,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
    ];
    const store = useStore();
    const data = reactive({});

    (function () {
      store.commit("SET_ITEMS", items);
      store.commit("SET_ITEMSCOPY", items);
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
