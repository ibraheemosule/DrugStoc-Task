<template>
  <div class="item" v-for="item in items" :key="item.title">
    <div class="message">
      <img src="@/assets/Images/books.svg" alt="books" />
      <div>
        <p>
          {{ item.title }} <br /><span
            ><i>{{ item.tag }}</i></span
          >
        </p>
      </div>
    </div>
    <div class="price">
      <div>
        <p>
          N{{ item.price }}.00 <br /><span>Task price</span
          ><span class="delivery"
            >Delivery: <small>within {{ item.status }} {{ item.period }}</small>
          </span>
        </p>
      </div>
    </div>
    <div class="profile">
      <img class="profile-img" src="@/assets/Images/person.jpg" alt="" />
      <div>
        <p>{{ item.name }} <br /><span>Assigned to</span></p>
      </div>
    </div>
    <div class="options">
      <div class="status">
        <div class="verify"><span></span> {{ item.status }}</div>
      </div>
      <div>
        <img class="message" src="@/assets/Images/message.svg" alt="message" />
      </div>
      <div class="dropdown">
        <button>
          <img class="more" src="@/assets/Images/dots.svg" alt="more" />
        </button>
        <div class="dropdown-content">
          <button @click="openModal" class="items" :id="item.title">
            Delete
          </button>
          <button class="items" :id="item.title">Edit</button>
        </div>
      </div>
    </div>
    <Modal @close="toggle" :modal="modalToggle" :id="id" />
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import Modal from "@/components/partials/DeleteModal.vue";

export default {
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      items: computed(() => store.getters.paginationItem),
      modalToggle: false,
      id: "",
    });
    const toggle = () => {
      data.modalToggle = !data.modalToggle;
    };
    const openModal = (e) => {
      data.id = e.target.id;
      toggle();
    };
    (function () {
      store.commit("SET_PAGINATIONITEM", store.getters.itemsCopy.slice(0, 6));
    })();
    return {
      ...toRefs(data),
      toggle,
      openModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  background: white;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 0.5em 1.5em;
  color: gray;

  @media (max-width: 620px) {
    flex-wrap: wrap;
  }
  @media (max-width: 550px) {
    flex-direction: column;
  }

  .message {
    display: flex;
    flex-basis: 30%;

    @media (max-width: 620px) {
      flex-basis: 100%;
    }
    img {
      width: 40px;
      height: 40px;
      align-self: center;
    }
    p {
      font-weight: bold;
      font-size: 0.8em;
      margin-left: 2em;
      word-wrap: break-word;
      padding-right: 1em;
      @media (max-width: 1115px) and (min-width: 621px) {
        margin-left: 1em;
      }

      span {
        display: inline-block;
        background: rgba(128, 128, 128, 0.226);
        border-radius: 2em;
        padding: 0.2em 0.5em;
        font-size: 0.8em;
        margin-top: 0.5em;
        color: gray;
      }
    }
  }
  .price {
    display: flex;
    flex-basis: 20%;

    @media (max-width: 620px) {
      flex-basis: 30%;
    }
    p {
      word-wrap: break-word;
      font-weight: bold;
      margin-top: 0.7em;
      span,
      .delivery {
        font-size: 0.8em;

        color: gray;
      }
      .delivery {
        margin-top: 0.8em;
        display: block;
      }
    }
  }
  .profile {
    display: flex;
    align-items: start;
    flex-basis: 20%;
    color: gray;
    font-weight: bold;
    @media (max-width: 950px) and (min-width: 621px) {
      flex-flow: column;
      align-items: center;
    }
    @media (max-width: 620px) {
      flex-basis: 30%;
    }
    .profile-img {
      width: 40px;
      height: 40px;
      margin-block-start: 1em;
      margin-block-end: 1em;
      @media (max-width: 950px) {
        margin-block-start: 1em;
        margin-block-end: 0;
      }
    }
    p {
      margin-left: 1em;
      word-wrap: break-word;

      span {
        display: inline-block;
        font-size: 0.7em;
        margin-top: 0.5em;
      }
    }
  }
  .options {
    display: flex;
    flex: 30%;
    justify-content: space-around;
    margin-block-start: 1em;
    margin-block-end: 1em;
    @media (max-width: 950px) and (min-width: 621px) {
      flex-flow: column;
      align-items: center;
    }
    @media (max-width: 620px) {
      flex-basis: 30%;
    }
    .status {
      .verify {
        display: flex;
        padding: 0.5rem 4rem 0.5rem 0.5rem;
        border-radius: 0 4em 4em 4em;
        font-weight: bolder;
        transition: all 0.1s ease-in;
        border: 2px solid gray;
        font-size: 0.7em;
        span {
          display: block;
          height: 8px;
          width: 8px;
          background: yellow;
          border-radius: 50%;
          align-self: center;
          margin-right: 1em;
        }
      }
    }
    p {
      margin-left: 2em;
      word-wrap: break-word;

      span {
        display: inline-block;
        background: rgba(128, 128, 128, 0.562);
        border-radius: 2em;
        padding: 0.2em 0.5em;
        font-size: 0.8em;
        margin-top: 0.5em;
      }
    }
    .dropdown {
      position: relative;
      display: inline-block;

      button {
        border: none;
        background: none;
        cursor: pointer;
      }
      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 100px;
        box-shadow: 0px 2px 2px 0px #000000b3;
        border-radius: 10px;
        overflow: hidden;
        z-index: 1;

        button.items {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          cursor: pointer;
          width: 100%;
        }
        button.items:hover {
          background-color: #ddd;
        }
      }
    }
    .dropdown:hover .dropdown-content {
      display: block;
      left: -100%;
    }
  }
}
</style>
