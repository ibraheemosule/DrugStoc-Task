import { createStore } from "vuex";

export default createStore({
  state: {
    items: [],
    itemsCopy: [],
    searchValue: "",
    success: "",
    paginationItem: "",
  },

  //GETTERS
  getters: {
    items: (state) => state.items,
    itemsCopy: (state) =>
      state.itemsCopy.filter((item) =>
        item.title.toLowerCase().includes(state.searchValue.toLowerCase())
      ),
    success: (state) => state.success,
    paginationItem: (state) => state.paginationItem,
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
        commit("SET_SUCCESS", true);
        let items = [newItem, ...state.items];
        commit("SET_ITEMS", items);
        commit("SET_ITEMSCOPY", items);
      }
    },
    deleteItem({ state, commit }, { id }) {
      //REMOVE ITEM FROM ITEMCOPY STATE
      let itemsCopy = state.itemsCopy;
      itemsCopy = itemsCopy.filter((item) => item.title !== id);
      commit("SET_ITEMSCOPY", itemsCopy);

      //REMOVE ITEM FROM ORIGINAL ITEMS STATE
      let items = state.items;
      items = items.filter((item) => item.title !== id);
      commit("SET_ITEMS", items);
      commit("SET_SUCCESS", true);
    },

    //FILTER LIST WITH TAGS
    tagsFilter({ state, commit }, { input, type }) {
      let items = state.items;
      let itemsCopy = state.itemsCopy;
      let filtered = [];
      if (type == "checkbox") {
        input.forEach((item) => {
          items.forEach((val) => {
            const value = val.tag.toLowerCase().split(" ")[0];
            if (value === item.toLowerCase().split(" ")[0])
              filtered = [...filtered, val];
          });
        });
        commit("SET_ITEMSCOPY", filtered);
      }
      if (type == "radio") {
        itemsCopy = items;
        switch (input.toLowerCase()) {
          case "less than n100":
            {
              itemsCopy.forEach((val) => {
                if (val.price < 100) {
                  filtered = [...filtered, val];
                }
              });
            }
            // code block
            break;
          case "n100 to n300":
            {
              itemsCopy.forEach((val) => {
                if (val.price > 99 && val.price < 301) {
                  filtered = [...filtered, val];
                }
              });
            }
            break;
          case "n301 to n900":
            {
              itemsCopy.forEach((val) => {
                if (val.price > 300 && val.price < 901) {
                  filtered = [...filtered, val];
                }
              });
            }
            break;
          case "above n900":
            {
              itemsCopy.forEach((val) => {
                if (val.price > 900) {
                  filtered = [...filtered, val];
                }
              });
            }
            break;
          case "all prices":
            {
              filtered = items;
            }
            break;
        }
        commit("SET_ITEMSCOPY", filtered);
      }
    },
  },

  //MUTATIONS
  mutations: {
    SET_ITEMS: (state, value) => (state.items = value),
    SET_ITEMSCOPY: (state, value) => (state.itemsCopy = value),
    SET_SEARCH_VALUE: (state, value) => (state.searchValue = value),
    SET_SUCCESS: (state, value) => (state.success = value),
    SET_PAGINATIONITEM: (state, val) => (state.paginationItem = [...val]),
  },
});
