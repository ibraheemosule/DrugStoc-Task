<template>
  <div class="container">
    <h3>{{ header }}</h3>

    <div class="tag" v-for="array in tagsArray" :key="array">
      <input type="radio" :id="array" :name="idname" :value="array" />
      <label :for="array">{{ array }}</label>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    tagsArray: Array,
    header: String,
    idname: String,
  },
  setup(props) {
    const data = reactive({});

    (function () {
      console.log(props.idname);
    })();

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  color: gray;
  margin-top: 3em;

  .tag {
    margin-top: 1em;
    label {
      margin-left: 1.5em;
      font-size: smaller;
      text-transform: capitalize;
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
    }
  }
}
</style>
