import { createStore } from "vuex";

export default createStore({
  state: {
    items: [
      {
        title: "c3jj dfj kldf jddlkfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "b2jj dfj kldf jddlkfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "y6jj dfj kldf jddlkfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "t5jj dfj kldf jddlkfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "e4jj dfj kldf jddlkfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "a1jj dfj kldf jddlkfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
    ],
  },

  //GETTERS
  getters: {
    items: (state) => state.items,
  },

  //ACTIONS
  actions: {},

  //MUTATIONS
  mutations: {},
});
