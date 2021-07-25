<template>
  <div class="pagination">
    <div>
      <button disabled id="previous" @click="previous">prev</button> |
      <button id="next" @click="next">next</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const data = reactive({
      paginationItem: computed(() => store.getters.paginationItem),
      total: computed(() => store.getters.itemsCopy).length,
      count: 1,
      current:
        store.getters.itemsCopy.length - 6 > 1
          ? 6
          : store.getters.itemsCopy.length,
      allItems: computed(() => store.getters.itemsCopy),
    });

    watch(
      () => [...data.allItems],
      (currentValue) => {
        store.commit("SET_PAGINATIONITEM", currentValue.slice(0, 6));
        data.total = data.paginationItem.length;
        data.count = 0;
        document.getElementById("previous").disabled = true;
        document.getElementById("next").disabled = false;
      }
    );

    //PAGINATION NEXT BUTTON
    const next = (e) => {
      const element = e.currentTarget;
      element.clicks = (element.clicks || 0) + 1;
      if (element.clicks == 1) {
        data.count = 1;
      } else {
        ++data.count;
      }
      document.getElementById("previous").disabled = false;
      let val = 6 * data.count;
      if (val >= data.allItems.length) {
        val = val % 6 == 0 ? 6 : val % 6;
        document.getElementById("next").disabled = true;

        const list = data.allItems.slice(-val, data.allItems.length);
        store.commit("SET_PAGINATIONITEM", list);
      } else {
        const list = data.allItems.slice(val, val + 6);
        store.commit("SET_PAGINATIONITEM", list);
      }
      const names = data.allItems.map((item) => item.title);
      const pagination =
        data.paginationItem[data.paginationItem.length - 1].title;
      if (names.indexOf(pagination) + 1 == data.allItems.length) {
        document.getElementById("next").disabled = true;
      }
    };

    //PAGINATION PREVIOUS BUTTON
    const previous = () => {
      --data.count;
      document.getElementById("next").disabled = false;
      let val = 6 * data.count;
      if (val == 0) {
        document.getElementById("previous").disabled = true;
        const list = data.allItems.slice(0, 6);
        store.commit("SET_PAGINATIONITEM", list);
      } else {
        const list = data.allItems.slice(val, val + 6);
        store.commit("SET_PAGINATIONITEM", list);
      }
    };

    return {
      ...toRefs(data),
      next,
      previous,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  div {
    button {
      border: none;
      margin: 0 0.5em;
      cursor: pointer;
    }
  }
}
</style>
