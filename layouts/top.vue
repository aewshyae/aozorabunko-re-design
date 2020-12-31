<template>
  <div class="top">
    <GlobalHeader />
    <div class="top-img">
      <img class="hero" src="images/top.jpg" alt="青空文庫">
      <p class="text">
        青空のように
        自由な、
        インターネット
        電子図書館。
      </p>
    </div>
    <nuxt class="root" />
  </div>
</template>

<script>
import Vue from 'vue'
import GlobalHeader from '~/components/global-header.vue'
export default Vue.extend({
  components: {
    GlobalHeader
  }
})
</script>

<style lang="scss" scoped>
.top-img {
  overflow: hidden;
  height: 80vh;
  width: 100%;
  max-width: none;
  position: relative;
  .hero {
    max-height: 100%;
    min-width: 100%;
    position: absolute;
    right: 0;
  }
  .text {
    writing-mode: vertical-rl;
    white-space: pre-line;
    padding-top: 14vh;
    padding-left: 15vw;
    color: white;
    font-weight: bold;
    font-family: serif;
    font-size: 1.4rem;
    letter-spacing: 0.2rem;
    position: absolute;
    top: 0;
  }
}
.root {
  padding: 2rem 1.2rem;
}
</style>
