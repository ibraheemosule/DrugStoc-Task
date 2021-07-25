<template>
  <div class="home">
    <body>
      <Header />
      <main>
        <aside>
          <Tags :tagsArray="tags" header="Tags" idname="tags" />
          <Tags :tagsArray="price" header="Task Price Range" idname="price" />
        </aside>
        <section>
          <div class="section__nav">
            <div class="tasks">
              <span>Active Task (2)</span>
              <span>Completed (1)</span>
              <span>Archived (6)</span>
              <span>Closed (0)</span>
            </div>
            <div>
              <Pagination />
            </div>
          </div>
          <div class="requests">
            <div class="current">
              <span> CURRENT</span>
              <img src="@/assets/Images/info.svg" alt="" />
            </div>
            <Item />
          </div>
        </section>
      </main>
    </body>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Header from "@/components/partials/Header.vue";
import Tags from "@/components/partials/Tags.vue";
import Item from "@/components/partials/Item.vue";
import Pagination from "@/components/partials/Pagination.vue";

export default {
  components: {
    Header,
    Tags,
    Item,
    Pagination,
  },
  setup() {
    const data = reactive({
      tags: [
        "custom tasks",
        "marketing & sales",
        "integrations",
        "optimization",
        "deployment",
        "testing",
      ],
      price: ["less than N100", "N100 to N300", "N301 to N900", "above N900"],
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>
<style lang="scss" scoped>
body {
  padding: 1em 2rem;
  @media (max-width: 500px) {
    padding: 1em 0.5em;
  }
  main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    aside {
      flex-basis: 25%;
      background: white;
      @media (max-width: 800px) {
        flex-basis: 100%;
        display: flex;
        justify-content: space-around;
      }
    }

    section {
      flex-basis: 72%;
      .section__nav {
        display: flex;

        @media (max-width: 800px) {
          margin-top: 3em;
        }
        .tasks {
          display: flex;
          flex: 1;
          justify-content: space-between;
          span {
            font-weight: bold;
            color: #808080;
          }
        }
      }
      .requests {
        margin-top: 3em;
        .current {
          display: flex;
          font-weight: bold;
          color: #808080;
          font-size: 0.7em;
          img {
            height: 12px;
            align-self: center;
            margin-left: 2px;
          }
        }
      }
      @media (max-width: 800px) {
        flex-basis: 100%;
      }
    }
  }
}
</style>
