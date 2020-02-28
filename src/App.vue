<template>
  <div id="app">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="scss">
// Global css
@import "./assets/scss/base.scss";
@import "./assets/scss/common.scss";
</style>

<script>
import Header from "@/components/partials/Header.vue";
import Footer from "@/components/partials/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  head: {
    meta() {
      return [
        {
          name: "viewport",
          content:
            "width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1"
        },
        { name: "format-detection", content: "telephone=no" },
        { property: "og:locale", content: "ja_JP" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://barth.jp/assets/images/ogp.jpg"
        },
        { property: "twitter:card", content: "summary" }
      ];
    }
  }
};
</script>
