<template>
  <div class="default">
    <GlobalHeader />
    <nuxt class="root" />
  </div>
</template>

<script>
import Vue from 'vue'
import GlobalHeader from '~/components/global-header.vue'
export default Vue.extend({
  name: 'DefaultLayout',
  components: {
    GlobalHeader
  }
})
</script>

<style lang="scss" scoped>
.root {
  padding: 2rem 0;
  overflow: hidden;
}
</style>
