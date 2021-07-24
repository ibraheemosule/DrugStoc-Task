import { createStore } from "vuex";

export default createStore({
  state: {
    items: [
      {
        title: "c3jj dfjdajopjgkxfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 400,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "b2jj dfj kldf jdxn aiofdahk jaxfhaig ldfj fjfldjfllds",
        tag: "deployment",
        price: 500,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "y6jj dfj kldf jq adl aae  kldfj fjfldjfllds",
        tag: "deployment",
        price: 300,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "t5jj dfj kldf ajhr auacodfjdljkldfj fjfldjfllds",
        tag: "deployment",
        price: 310,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "e4jj dfj kldf j ad adfcofjhjkldfj fjfldjfllds",
        tag: "deployment",
        price: 800,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
      {
        title: "a1jj dfj kldfgkja cojdcoljkldfj fjfldjfllds",
        tag: "deployment",
        price: 100,
        period: "years",
        status: "waiting approval",
        name: "ibraheem sulay",
      },
    ],
    itemsCopy: [],
    searchValue: "",
    success: "",
  },

  //GETTERS
  getters: {
    items: (state) => state.items,
    itemsCopy: (state) =>
      state.itemsCopy.filter((item) =>
        item.title.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    success: (state) => state.success,
  },

  //ACTIONS
  actions: {
    sortMethod({ state, commit }, { value }) {
      let sortItems;
      const items = state.items.filter((item) =>
        item.title.toLowerCase().includes(state.searchValue.toLowerCase())
      );
      if (value == "1") {
        sortItems = items.sort((a, b) => a.title.localeCompare(b.title));
      }

      if (value == "2")
        sortItems = items.sort((a, b) => b.title.localeCompare(a.title));

      if (value == "3")
        sortItems = items.sort(function (a, b) {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          return 0;
        });

      if (value == "4") {
        sortItems = items.sort(function (a, b) {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
      }
      commit("SET_ITEMSCOPY", sortItems);
    },

    //SEARCH BAR UPDATER
    filter({ commit, dispatch }, { value }) {
      if (value.length == 0) dispatch("sortMethod", { value: 1 });

      commit("SET_SEARCH_VALUE", value);
    },
    addNewItem({ state, commit }, { newItem }) {
      const itemsTitleArray = state.items.map((item) => item.title);
      if (itemsTitleArray.includes(newItem.title)) {
        commit("SET_SUCCESS", false);
        return;
      } else {
        commit("SET_SUCCESS", "");
        let items = [newItem, ...state.items];
        commit("SET_ITEMS", items);
        commit("SET_ITEMSCOPY", items);
      }
    },
    deleteItem({ state, commit }, { id }) {
      //REMOVE ITEM FROM ITEMCOPY STATE
      const itemsCopyTitles = state.itemsCopy.map((item) => item.title);
      const itemCopyIndex = itemsCopyTitles.indexOf(id);
      const itemsCopy = state.itemsCopy;
      itemsCopy.splice(itemCopyIndex, 0);
      commit("SET_ITEMSCOPY", itemsCopy);

      //REMOVE ITEM FROM ORIGINAL ITEMS STATE
      const itemsTitles = state.items.map((item) => item.title);
      const itemIndex = itemsTitles.indexOf(id);
      const items = state.items;
      items.splice(itemIndex, 0);

      commit("SET_ITEMS", items);
      commit("SET_SUCCESS", true);
    },
  },

  //MUTATIONS
  mutations: {
    SET_ITEMS: (state, value) => (state.items = value),
    SET_ITEMSCOPY: (state, value) => (state.itemsCopy = value),
    SET_SEARCH_VALUE: (state, value) => (state.searchValue = value),
    SET_SUCCESS: (state, value) => (state.success = value),
  },
});
