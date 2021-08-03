<template>
  <div class="container">
    <h3>{{ header }}</h3>

    <div class="tag" v-for="array in tagsArray" :key="array">
      <input
        @click="selected"
        :type="type"
        :id="array"
        :name="idname"
        :value="array"
      />
      <label :for="array">{{ array }}</label>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    tagsArray: Array,
    header: String,
    idname: String,
    type: String,
  },
  setup(props) {
    const store = useStore();
    const data = reactive({
      input: [],
      items: computed(() => store.getters.items),
    });

    const selected = (e) => {
      const input = data.input;
      const check = e.target.checked;
      const radioInput = document.querySelectorAll("[type='radio']");
      const checkboxInput = document.querySelectorAll("[type='checkbox']");

      if (props.type == "checkbox" && check) {
        radioInput.forEach((input) => (input.checked = false));
        data.input = [...input, e.target.value];
        store.dispatch("tagsFilter", {
          input: data.input,
          type: props.type,
        });
        return;
      } else if (props.type == "checkbox" && !check) {
        const filterInput = [...new Set(data.input)];
        const input = filterInput.map((item) => item.split(" ")[0]);
        const filter = input.filter((val) => val !== e.target.value);
        if (filter.length === 0) {
          store.commit("SET_ITEMSCOPY", data.items);
          return;
        }
        data.input = filter;

        store.dispatch("tagsFilter", {
          input: filter,
          type: props.type,
        });
        return;
      }
      if (props.type == "radio" && check) {
        data.input = e.target.id;
        checkboxInput.forEach((input) => (input.checked = false));
      }
      store.dispatch("tagsFilter", {
        input: data.input,
        type: props.type,
      });
    };

    return {
      ...toRefs(data),
      selected,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  color: gray;
  margin: 3em 0;
  padding-left: 2em;

  .tag {
    margin-top: 1em;
    label {
      margin-left: 1.5em;
      font-size: smaller;
      text-transform: capitalize;
    }
    input {
      cursor: pointer;
    }
    input[type="radio"]:after {
      width: 15px;
      height: 15px;
      position: relative;
      top: -1px;
      background-color: white;
      content: "";
      display: inline-block;
      visibility: visible;
      border: 1px solid gray;
      border-radius: 50%;
    }

    input[type="radio"]:checked:after {
      width: 15px;
      height: 15px;
      position: relative;
      background-color: #4b70d6;
      top: -1px;
      color: white;
      content: "\2713";
      display: inline-block;
      visibility: visible;
      border: 1px solid #4b70d6;
      border-radius: 50%;
    }
  }
}
</style>
