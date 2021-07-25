<template>
  <div>
    <div
      id="myModal"
      class="modal"
      :style="modal === true ? { display: 'block' } : { display: 'none' }"
    >
      <div class="modal-content">
        <h5
          v-if="success === true"
          class="verify"
          style="color: green; text-align: center"
        >
          ITEM DELETED
        </h5>
        <div class="verify" v-if="success === ''">
          <h3 style="text-align: center">Proceed To Delete Task?</h3>
          <div class="btn-group">
            <button @click="close" class="cancel">Cancel</button>
            <button @click="deleteItem" class="confirm">Confirm</button>
          </div>
        </div>
        <span class="close" @click="close">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    modal: Boolean,
    id: String,
  },
  setup(props, { emit }) {
    const store = useStore();
    const data = reactive({
      success: computed(() => store.getters.success),
    });

    const close = () => {
      store.commit("SET_SUCCESS", "");
      emit("close");
    };

    //ADD NEW ITEM
    const deleteItem = () => {
      store.dispatch("deleteItem", { id: props.id });
    };
    window.onclick = function (event) {
      if (event.target.id == "myModal") {
        close();
      }
    };
    return {
      ...toRefs(data),
      close,
      open,
      deleteItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #00000033;

  .modal-content {
    display: flex;
    justify-content: space-between;
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    border-radius: 20px;
    @media (max-width: 700px) {
      width: 80%;
    }
    @media (max-width: 540px) {
      margin-top: 30%;
    }
    .verify {
      flex: 1;

      .btn-group {
        display: flex;
        justify-content: space-around;
        flex: 1;
        button {
          margin: 1em auto;
          padding: 0.5rem 1.5rem;
          border-radius: 4em 4em 4em 4em;
          background: #010196;
          color: #fff;
          font-weight: bolder;
          border-color: #010196;
          transition: all 0.2s ease-in;
          cursor: pointer;
          &:hover {
            background: #010196c9;
            border-color: #010196c9;
          }
        }
        .cancel {
          background: #ff0000;
          border-color: #ff0000;
          &:hover {
            background: #ff0000c9;
            border-color: #ff0000c9;
          }
        }
      }
    }
    .close {
      color: #aaa;
      font-size: 28px;
      font-weight: bold;
      margin-top: -10px;
      margin-left: 1em;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>
