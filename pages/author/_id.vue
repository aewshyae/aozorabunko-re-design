<template>
  <section class="author">
    <header class="header">
      <div class="title">
        <h1 class="page-title">
          {{ author.name }}
        </h1>
        <p class="title-caption">
          <span class="kana">{{ author.name_kana }}</span>
          <span class="en">{{ author.name_en }}</span>
        </p>
      </div>
      <div class="date">
        (
        <span class="birth">{{ author.born_on | parseDate }}</span>
        〜
        <span class="passaway">{{ author.died_on | parseDate }}</span>
        )
      </div>

      <div class="description">
        <h3 class="head">
          作家について
        </h3>
        <p class="desc" v-html="author.desc" />
      </div>
    </header>

    <div class="works">
      <div class="published">
        <h2 class="section-title">
          公開中の作品
        </h2>
        <ul>
          <li>
            <nuxt-link
              v-for="w in author.work"
              :key="w.work_id"
              class="title published-link"
              :to="`/book/${w.work_id}`"
            >
              {{ w.titleToDisplay }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="workings">
        <h2 class="section-title">
          作業中の作品
        </h2>
        <ul>
          <li>
            <span
              v-for="w in author.wip"
              :key="w.work_id"
              class="title working-text"
            >{{ w.titleToDisplay }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

type Work = any

export default Vue.extend({
  name: 'Author',
  components: {
  },
  filters: {
    parseDate (d: string) {
      try {
        return dayjs(d).format('LL')
      } catch (e) {
        return d
      }
    }
  },
  asyncData ({ params, payload, store }) {
    const id = params.id
    if (!id && !payload) {
      return
    }
    const author = payload || store.state.personDetail[id]
    const generateTitle = (works: Work[]) => {
      works.forEach(w => {
        w.titleToDisplay =  `${w.title} ${w.subtitle || ""}`
      })
    }
    generateTitle(author.work)
    generateTitle(author.wip);

    const allWorks = (author.work || []).concat(author.wip || [])
    allWorks.forEach( (w1: Work) => {
      const w1Changed = allWorks.map( (w2: Work) => {
        if (w1.work_id === w2.work_id) { return false}
        if (w1.titleToDisplay === w2.titleToDisplay) {
          w2.titleToDisplay = `${w2.titleToDisplay}（${w2.kana_type}）`
          return true
        }
      }).some( (e: boolean) => e)
      if (w1Changed) {
        w1.titleToDisplay = `${w1.titleToDisplay}（${w1.kana_type}）`
      }
    })
    

    // TODO 作品を頭文字であ行〜わ行に分類したいが、作品にかながついていないのでできない
    return {
      author
    }
  }
})
</script>

<style lang="scss" scoped>
h1.page-title {
  font-size: 2rem;
  font-weight: bold;
}

.title-caption {
  font-size: 0.7rem;
  font-weight: normal;
  margin: 0.5rem 0;
  .kana {
    margin-right: 1rem;
  }
}

.date {
  font-size: 0.7rem;
  margin: 1.5rem 0;
}

.description {
  h3.head {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 0.2rem;
  }
}

h2.section-title {
  font-size: 1.8rem;
  font-family: serif;
  letter-spacing: 0.2rem;
  border-bottom: 1px solid $border;
  color: $primary;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.works {
  .title {
    font-size: 1rem;
    font-weight: normal;
    display: block;
    text-decoration: underline;
    margin-bottom: 1rem;
  }
}
</style>
