<template>
  <nav class="search-panel" :class="{ 'shown': showSearch }">
    <section class="search-words">
      <input v-model="keyword" type="text" placeholder="作者名・作品名・キーワードで探す">
      <img src="images/search-glass.png" alt="検索" class="glass">
    </section>
    <article class="indices">
      <section v-for="indice in indices" :key="indice.key" class="indice-by" :class="indice.cssClass">
        <h2>{{ indice.label }}</h2>
        <ul class="links">
          <li v-for="e in indice.list" :key="e.key" class="link">
            <nuxt-link :to="`/${indice.key}/${e.key}`">
              {{ e.label }}
            </nuxt-link>
          </li>
        </ul>
      </section>
    </article>
    <button class="close">
      <img src="images/close.png" alt="閉じる" class="close" @click.stop="close">
    </button>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
const NDC1 = require('@/static/ndc_class_1.json')

type KeyLabel = {key:string, label: string}
type Indice = KeyLabel & { list: KeyLabel[], cssClass: string }

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
          key: "authors/index",
          cssClass: "author",
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
          key: "books/index",
          cssClass: "book",
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
          key: "books/ndc",
          cssClass: "ndc",
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
  },
  methods: {
    close() {
      this.$emit("close-search")
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~assets/css/color";
.search-panel {
  font-family: monospace;
  width: 100%;
  background: white;
  transition: all 0.5s ease;
  opacity: 0;
  visibility: hidden;
  &.shown {
    opacity: 1;
    visibility: visible;
  }
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
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
      letter-spacing: 3px;
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
        a {
          text-decoration: none;
        }
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
    height: 1.5rem;
    margin: auto;
  }
}
@media (min-width: 426px) {
  .search-words {
    max-width: 400px;
    padding-left: 3rem;
    input {
      padding: 0.5rem 2rem;
    }
    .glass {
      top: 1.5rem;
      right: 1rem;

    }
  }
  .indices {
    .indice-by {
      border-top: 1px solid $border;
      padding: 1.5rem 1.5rem 1rem;
      h2 {
        display: inline-block;
        padding-right: 1.5rem;
          margin-bottom: 0.5rem;
      }
      .links {
        display: inline-flex;
        flex-wrap: wrap;
        padding: 0;
        margin-bottom: 0;
        & > .link {
          padding: 0 1.5rem;
          margin-bottom: 0.5rem;
          border-top: none;
          border-bottom: none;
        }
      }
    }
  }
}
</style>
