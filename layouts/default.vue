<template>
  <div class="container">
    <GlobalHeader />
    <nuxt />
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
