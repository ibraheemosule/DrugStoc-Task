<template>
  <header>
    <div class="nav">
      <nav class="navbar">
        <img
          src="@/assets/Images/logo.jpg"
          alt="Star wars logo"
          class="navbar__logo"
        />
      </nav>
      <div>
        <button @click="openModal" class="add-item">
          <span>Add New Item</span>
          <img src="@/assets/Images/plus.svg" alt="add item" />
        </button>
      </div>
    </div>
    <div class="searchbar">
      <input
        type="text"
        placeholder="Search Keyword"
        class="searchbar__input"
        v-model="search"
      />
      <div class="searchbar__icon">
        <img src="@/assets/Images/search.svg" alt="search bar icon" />
      </div>
      <div class="searchbar__sort">
        <select v-model="sortBy">
          <option value="" disabled selected>Sort By</option>
          <optgroup label="Alphabetical">
            <option value="1ascending">Ascending</option>
            <option value="2descending">Descending</option>
          </optgroup>
          <optgroup label="Price">
            <option value="3ascending">Ascending</option>
            <option value="4descending">Descending</option>
          </optgroup>
        </select>
        <img src="@/assets/Images/sort.svg" alt="sort icon" />
      </div>
    </div>
    <Modal @close="toggle" :modal="modalToggle" :signup="signup" />
  </header>
</template>

<script>
import { reactive, toRefs, watch, ref } from "vue";

import Modal from "@/components/partials/AddItemModal.vue";
import { useStore } from "vuex";

export default {
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const signup = ref("");
    const sortBy = ref("");
    const search = ref("");
    const data = reactive({
      modalToggle: false,
    });
    //WATCH THE SORT SELECT TAG VALUE
    watch(sortBy, () => {
      store.dispatch("sortMethod", { value: sortBy.value[0] });
    });

    //WATCH THE SEARCH BAR
    watch(search, () => {
      store.dispatch("filter", { value: search });
    });

    const openModal = async () => {
      signup.value = true;
      toggle();
      signup.value = false;
      store.commit("SET_SUCCESS", "");
    };
    const toggle = () => {
      data.modalToggle = !data.modalToggle;
    };
    document.addEventListener(
      "click",
      (e) => {
        if (signup.value) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true
    );
    return {
      ...toRefs(data),
      openModal,
      toggle,
      signup,
      sortBy,
      search,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  .nav {
    display: flex;
    justify-content: space-between;
    .navbar {
      margin-right: 2rem;
      &__logo {
        height: 40px;

        @media (max-width: 768px) {
          height: 40px;
        }

        @media (max-width: 600px) {
          height: 30px;
        }
      }
    }
    .add-item {
      display: flex;
      padding: 0.5rem 1.5rem;
      border-radius: 0 4em 4em 4em;
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
      span {
        align-self: center;
        margin-right: 0.5em;
      }
      @media (max-width: 600px) {
        padding: 0.1em 0.5em;
      }
    }
  }

  .searchbar {
    position: relative;
    display: flex;
    margin: 2rem 0 2rem 0;
    &__input {
      padding: 1rem 0 1rem 5rem;
      font-size: 1.35rem;
      flex: 1;
      border: none;
    }

    &__icon {
      position: absolute;
      cursor: pointer;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      color: gray;

      img {
        width: 30px;
      }
    }

    &__sort {
      position: absolute;
      display: flex;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      border: 0;
      background: none;

      border-left: 1px solid black;
      padding-left: 1em;
      select {
        cursor: pointer;
        border: 0;
        background: none;
        -moz-appearance: none;
        padding: 0;
        -webkit-appearance: none;
        ::-ms-expand {
          display: none;
        }
      }
      &:hover {
        color: #808080;
      }
      select:focus {
        background: white;
        z-index: 2;
      }
      @media (max-width: 500px) {
        padding: 0 0 0 0.2em;
      }
      img {
        width: 30px;
        margin-left: -0.8em;
        @media (max-width: 500px) {
          width: 20px;
        }
      }
      span {
        align-self: center;
        @media (max-width: 500px) {
          display: none;
        }
      }
    }
    //mini
    &.mini {
      flex-basis: 50%;

      .searchbar__input {
        font-size: 0.9rem;
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.5);
      }

      .searchbar__icon {
        position: absolute;
        left: 0.6rem;
        top: 58%;

        img {
          width: 15px;
        }
      }
    }

    @media (max-width: 460px) {
      .searchbar__input {
        font-size: 1rem;
        padding: 0.8rem;
        padding-left: 3rem;
        width: 90%;
      }

      .searchbar__icon {
        left: 1rem;
        img {
          width: 12px;
        }
      }
    }
  }
}
</style>
