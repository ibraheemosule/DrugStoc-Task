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
        title: "Lorem ipsum dolor sit amet, consectetur",
        tag: "Testing",
        price: 40,
        period: "days",
        status: "verify",
        name: "Stone John",
      },
      {
        title: "adipiscing elit. Donec congue, odio",
        tag: "Deployment",
        price: 300,
        period: "months",
        status: "in progress",
        name: "Priya Ponnappa",
      },
      {
        title: "ut faucibus dapibus, nunc risus efficitur",
        tag: "Optimization",
        price: 270,
        period: "days",
        status: "in review",
        name: "Wong Mia",
      },
      {
        title: "dui, ut molestie ipsum metus quis risus",
        tag: "Deployment",
        price: 180,
        period: "years",
        status: "waiting approval",
        name: "Stanbrige Peter",
      },
      {
        title: "Curabitur elementum elit quis",
        tag: "Deployment",
        price: 200,
        period: "days",
        status: "verify",
        name: "Lee-Walsh Natalie",
      },
      {
        title: "varius gravida. Nam efficitur nisl nulla",
        tag: "Integrations",
        price: 800,
        period: "months",
        status: "waiting approval",
        name: "Li Ang",
      },
      {
        title: "eu ornare libero eleifend et",
        tag: "Deployment",
        price: 450,
        period: "days",
        status: "in review",
        name: "Ithya Nguta",
      },
      {
        title: "Quisque maximus lacus nunc",
        tag: "Deployment",
        price: 560,
        period: "months",
        status: "waiting approval",
        name: "French Tamzyn",
      },
      {
        title: "quis dignissim ex posuere at",
        tag: "Testing",
        price: 420,
        period: "years",
        status: "in progress",
        name: "Simoes, Salome",
      },
      {
        title: " Vestibulum ante ipsum primis in",
        tag: "Deployment",
        price: 800,
        period: "years",
        status: "verify",
        name: "Virtue, Trevor",
      },
      {
        title: "faucibus orci luctus et ultrices posuere",
        tag: "Optimization",
        price: 200,
        period: "days",
        status: "in progress",
        name: "ibraheem sulay",
      },
      {
        title: "Nullam maximus augue eget ex faucibu",
        tag: "Deployment",
        price: 300,
        period: "years",
        status: "waiting approval",
        name: "Campbell Gillies",
      },
      {
        title: "at mollis purus tristique. Duis maximus tincidunt",
        tag: "Deployment",
        price: 330,
        period: "months",
        status: "verify",
        name: "Anderson Eugenia",
      },
      {
        title: "et justo nec lacus rutrum tristique.",
        tag: "Deployment",
        price: 700,
        period: "years",
        status: "waiting approval",
        name: "Kazantzis John",
      },
      {
        title: "Pellentesque ornare, risus nec dapibus interdum",
        tag: "Deployment",
        price: 100,
        period: "months",
        status: "in review",
        name: "Blair Verona",
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
