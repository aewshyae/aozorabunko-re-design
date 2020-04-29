<template>
  <div class="container">
    <GlobalHeader />
    <nuxt class="nuxt" />
  </div>
</template>

<script>
import Vue from "vue";
import GlobalHeader from "~/components/global-header.vue"
export default Vue.extend({
  components: {
    GlobalHeader
  }
})
</script>

<style lang="scss" scoped>
.nuxt {
  padding: 2rem 1.2rem;
}
</style>
