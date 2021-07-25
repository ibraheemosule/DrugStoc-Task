<template>
  <div>
    <div
      id="myModal"
      class="modal"
      :style="modal === true ? { display: 'block' } : { display: 'none' }"
    >
      <div class="modal-content">
        <h5 v-if="success === true" style="color: green">
          ITEM HAS BEEN ADDED
        </h5>
        <h5 v-if="success === false" style="color: red">
          SORRY, DUPLICATE ITEM CANNOT BE ADDED
        </h5>
        <div class="form-data" v-if="success === ''">
          <h3>ADD NEW TASK</h3>
          <form @submit.prevent="addItem" id="new-item-form">
            <div class="data">
              <label for="title">Task Title:</label>
              <div class="input-container">
                <input v-model="title" type="text" id="title" />
              </div>
            </div>
            <div class="data">
              <label for="task">Task Tag:</label>
              <div class="input-container">
                <input v-model="tag" type="text" id="task" list="taskList" />
                <datalist id="taskList">
                  <option value="Custom Tasks"></option>
                  <option value="Market & Sales"></option>
                  <option value="Integrations"></option>
                  <option value="Optimization"></option>
                  <option value="Deployment"></option>
                  <option value="Testing"></option>
                </datalist>
              </div>
            </div>
            <div class="data">
              <label for="price">Task Price:</label>
              <div class="input-container" style="position: relative">
                <span style="position: absolute; top: 17%; left: 2%"
                  >&#8358;</span
                >
                <input
                  v-model="price"
                  type="number"
                  id="price"
                  min="1"
                  style="padding-left: 20px"
                />
              </div>
            </div>
            <div class="data">
              <label for="deliveryPeriod">Delivery Period:</label>
              <div class="input-container">
                <input
                  v-model="delivery"
                  type="text"
                  id="deliveryPeriod"
                  list="delivery"
                  maxlength="10"
                  placeholder="Period When Item Will Be Delivered"
                />
                <datalist id="delivery">
                  <option value="day(s)"></option>
                  <option value="Week(s)"></option>
                  <option value="Month(s)"></option>
                  <option value="Year(s)"></option>
                </datalist>
              </div>
            </div>
            <div class="data">
              <label for="length">Period Length:</label>
              <div class="input-container">
                <input
                  v-model="length"
                  type="number"
                  id="length"
                  min="1"
                  placeholder="Input a Number For Period Length"
                />
              </div>
            </div>
            <div class="data">
              <label for="status">Task Status:</label>
              <div class="input-container">
                <input
                  v-model="status"
                  type="text"
                  id="status"
                  list="taskStatus"
                  maxlength="16"
                />
                <datalist id="taskStatus">
                  <option value="Verify"></option>
                  <option value="In Progress"></option>
                  <option value="In Review"></option>
                  <option value="Waiting Approval"></option>
                </datalist>
              </div>
            </div>
            <div class="data">
              <label for="name">Name Assigned To:</label>
              <div class="input-container">
                <input
                  v-model="name"
                  type="text"
                  id="name"
                  maxlength="20"
                  placeholder="Personnel To Deliver Item"
                />
              </div>
            </div>
            <div v-if="verifyFields === false" class="verifyFields">
              Some fields are empty
            </div>
            <div class="button-container">
              <button class="add-item">Submit</button>
            </div>
          </form>
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
      title: "",
      tag: "",
      price: "",
      delivery: "",
      length: "",
      status: "",
      name: "",
      success: computed(() => store.getters.success),
      verifyFields: true,
    });

    const close = () => {
      data.verifyFields == false;
      store.commit("SET_SUCCESS", "");
      data.title = "";
      data.tag = "";
      data.price = "";
      data.delivery = "";
      data.length = "";
      data.status = "";
      data.name = "";

      emit("close");
    };

    window.onclick = function (event) {
      const modal = document.getElementById("myModal");
      if (event.target == modal) {
        close();
      }
    };

    //ADD NEW ITEM
    const addItem = () => {
      data.verifyFields = true;
      const elements = document.getElementsByTagName("input");
      for (let i = 1; i < elements.length; i++) {
        if (elements[i].value.length < 1) {
          data.verifyFields = false;
          return;
        }
      }
      const newItemObj = {
        title: data.title,
        tag: data.tag,
        price: data.price,
        delivery: data.delivery,
        length: data.length,
        status: data.status,
        name: data.name,
      };
      if (data.verifyFields == true && props.id == undefined) {
        store.dispatch("addNewItem", { newItem: newItemObj });
      } else if (data.verifyFields == true && props.id != undefined) {

        store.dispatch("editItem", { newItem: newItemObj, id: props.id });
      }
      data.verifyFields = false;
    };
    return {
      ...toRefs(data),
      close,
      open,
      addItem,
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
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

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
    .form-data,
    h5 {
      flex: 1;
      color: #616161;
      h3 {
        text-align: center;
      }
      form {
        .data {
          display: flex;
          align-items: center;
          margin: 0em 0em 1em 0em;
          label {
            font-weight: 600;
            text-transform: capitalize;
          }
          .input-container {
            flex: 1;
            margin-left: 1em;
            input {
              box-sizing: border-box;
              width: 100%;
              padding: 0.5em;
              border-radius: 7px;
            }
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* Firefox */
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
        }
        .verifyFields {
          display: block;
          text-align: center;
          color: red;
        }
        .button-container {
          text-align: center;
          .add-item {
            margin: 1em auto;
            padding: 0.5rem 1.5rem;
            border-radius: 4em 4em 4em 4em;
            background: #4b70d6;
            color: #fff;
            font-weight: bolder;
            border-color: #4b70d6;
            transition: all 0.2s ease-in;
            cursor: pointer;
            &:hover {
              background: #010196;
              border-color: #010196;
            }
          }
        }
      }
    }
    h5 {
      text-align: center;
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
