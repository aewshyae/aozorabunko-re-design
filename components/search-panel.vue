<template>
  <nav class="search-panel">
    <section class="search-words" >
      <input type="text" v-model="keyword" placeholder="作者名・作品名・キーワードで探す">
      <img src="images/search-glass.png" alt="検索" class="glass" />
    </section>
    <article class="indices">
      <section class="indice-by" v-for="indice in indices" :key="indice.key" :class="indice.key">
        <h2>{{indice.label}}</h2>
        <ul class="links">
          <li class="link" v-for="e in indice.list" :key="e.key">
            {{e.label}}
          </li>
        </ul>
      </section>
    </article>
    <button class="close">
      <img src="images/close.png" alt="閉じる" class="close" />
    </button>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
const NDC1 = require('@/static/ndc_class_1.json')

type KeyLabel = {key:string, label: string}
type Indice = KeyLabel & { list: KeyLabel[] }

export default Vue.extend({
  name: 'SearchPanel',
  props: {
    showSearch: Boolean
  },
  data() {
    return {
      keyword: ""
    }
  },
  computed: {
    indices(): Indice[] {
      return [
        {
          key: "author",
          label: "作者別",
          list: [
            ...this.initials,
            {
              key: "all",
              label: "全作家一覧"
            }
          ]
        },
        {
          key: "book",
          label: "作品別",
          list: [
            ...this.initials,
            {
              key: "ranking",
              label: "ランキング"
            }
          ]
        },
        {
          key: "ndc",
          label: "分類別",
          list: Object.entries(NDC1).map(([k,v]): KeyLabel => ({
            key: `${k}`,
            label: `${k}.${v}`
          }))
        }

      ]
    },
    initials() {
      const result: KeyLabel[] = [];
      "あa,かka,さsa,たta,なna,はha,まma,やya,らra,わwa,他others".split(",").forEach(e => {
        result.push({
          label: e[0],
          key: e.slice(1)
        })
      })
      return result
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~assets/css/color";
.search-panel {
  font-family: monospace;
}
.search-words {
  padding: 1rem;
  position: relative;
  input {
    font-size: 1rem;
    background-color: #eee;
    padding: 1rem;
    width: calc(100% - 2rem);
    border-radius: 1.5rem;
    border: none;
  }
  .glass {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
}
.indices {
  margin: 1rem;
  .indice-by {
    h2 {
      color: $primary;
      font-size: 1.1rem;
      font-weight: normal;
      margin-bottom: 0.3rem;
    }
    .links {
      margin-top: 0;
      margin-bottom: 2rem;
      text-align: center;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      & > .link {
        border: 1px solid $border;
        border-collapse: collapse;
        margin: -1px 0 0 -1px;
        padding: 0.9rem 1rem 0.8rem;
        vertical-align: text-bottom;
      &:last-child {
        grid-column: span 2;
      }
      }
    }
    &.ndc {
      .links {
        grid-template-columns: repeat(2, 1fr);
        & > .link {
          letter-spacing: 1px;
          &:last-child {
            grid-column: auto;
          }
        }
      }
    }
  }
}
button.close {
  width: 100%;
  margin-bottom: 2rem;
  img {
    height: 2rem;
    margin: auto;
  }
}
@media screen and (max-width: 360px) {
}
</style>
