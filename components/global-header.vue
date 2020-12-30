<template>
  <div class="global-header">
    <div class="logo">
      <img src="images/mobile/logo.png" alt="ロゴ" class="logo-img">
    </div>
    <div class="search">
      <img src="images/mobile/glass.png" alt="検索" class="glass">
      <span class="text"><span>作品</span><span>検索</span></span>
    </div>
    <div class="menu">
      <img src="images/mobile/three-lines.png" alt="メニュー" class="three-lines">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GlobalHeader'
})
</script>

<style lang="scss" scoped>
@import "~assets/css/color";
.global-header {
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: serif;
  color: $primary;
  border-bottom: 1px solid $border;
  background-color: white;
  .logo {
    width: 41.667%;
    margin: 1rem 1rem 0.5rem;
    text-align: center;
    .logo-img {
      height: 2.7rem;
    }
  }
  .search {
    height: 100%;
    flex: auto;
    border-right: 1px solid $border;
    border-left: 1px solid $border;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .glass {
      height: 1.2rem;
      margin: 0.5rem;
      margin-right: 0.2rem;
    }
    .text {
      letter-spacing: 0.1rem;
      font-weight: bold;
      flex-direction: column;
      margin: 0.2rem;
    }
  }
  .menu {
    width: 70px;
    text-align: center;
    .three-lines {
      height: 1.5rem;
    }
  }
}
@media screen and (max-width: 360px) {
  .search .text{
    display: flex;
  }
}
</style>
