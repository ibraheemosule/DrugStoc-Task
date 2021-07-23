<template>
  <div class="home">
    <body>
      <Header />
      <main>
        <aside>
          <Tags :tagsArray="tags" header="Tags" idname="tags" />
          <Tags :tagsArray="price" header="Task Price Range" idname="price" />
        </aside>
      </main>
    </body>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Header from "@/components/partials/Header.vue";
import Tags from "@/components/partials/Tags.vue";

export default {
  components: {
    Header,
    Tags,
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
}
</style>
