<template>
  <div class="top">
    <GlobalHeader />
    <div class="top-img">
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
  width: auto;
  max-width: none;
  position: relative;
  background-image: url("~assets/img/top.jpg");
  background-repeat: no-repeat;
  background-position: 75% 0;
  background-size: cover;
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
  }
}
.root {
  padding: 2rem 1.2rem;
}
</style>
