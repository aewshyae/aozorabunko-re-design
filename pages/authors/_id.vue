<template>
  <section v-if="author" class="author">
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
        <span class="birth">{{ bornOn }}</span>
        〜
        <span class="passaway">{{ diedOn }}</span>
        )
      </div>

      <div v-if="showDesc" class="description">
        <h2 class="head">
          作家について
        </h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="desc" v-html="desc" />
      </div>
    </header>

    <div class="works">
      <div class="published">
        <h2 class="section-title">
          公開中の作品
        </h2>
        <ul v-if="Array.isArray(author.work) && author.work.length > 0">
          <li
            v-for="w in author.work"
            :key="w.work_id"
          >
            <nuxt-link
              class="title published-link"
              :to="`/works/${w.work_id}`"
            >
              {{ w.titleToDisplay }}
            </nuxt-link>
          </li>
        </ul>
        <span v-else>（なし）</span>
      </div>
      <div class="workings">
        <h2 class="section-title">
          作業中の作品
        </h2>
        <ul v-if="Array.isArray(author.wip) && author.wip.length > 0">
          <li>
            <span
              v-for="w in author.wip"
              :key="w.work_id"
              class="title working-text"
            >{{ w.titleToDisplay }}</span>
          </li>
        </ul>
        <span v-else>（なし）</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Author, AuthorWork } from '@/types/author'
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
  validate ({ params }) {
    return /\d+/.test(params.id)
  },
  async asyncData ({ params, payload, $axios }) {
    const id = Number.parseInt(params.id)
    const authors = payload || await $axios.$get(process.env.PERSON_DETAIL_URL!) || []
    const author: Author = payload || authors.find((e: { id: number }) => e.id === id)
    if (!author) {
      return {
        author: undefined
      }
    }

    // TODO この処理はJSON生成時にサーバサイドに移動したい
    // TODO 作品を頭文字であ行〜わ行に分類したいが、作品にかながついていないのでできない
    const updatePersonDetailWorkTitle = (w: AuthorWork) => {
      const title = `${w.title} ${w.subtitle || ''}`
      const kana = w.needKanaType ? ` （${w.kana_type}）` : ''
      w.titleToDisplay = `${title}${kana}`
    }
    const allWorks = (author.work || []).concat(author.wip || []).sort((a, b) => a.work_id > b.work_id ? 1 : -1)
    allWorks.forEach((w1: AuthorWork) => {
      allWorks.forEach((w2: AuthorWork) => {
        if (w1.work_id > w2.work_id) { return }
        const needKana = w1.title === w2.title && w1.subtitle === w2.subtitle
        if (needKana && w1.work_id !== w2.work_id) {
          w1.needKanaType = true
          w2.needKanaType = true
        }
        updatePersonDetailWorkTitle(w1)
        updatePersonDetailWorkTitle(w2)

      })
    })

    const parseDate = (d: string) => {
      try {
        if (!d) { return }
        return dayjs(d).format('LL')
      } catch (e) {
        return d
      }
    }

    // TODO この処理はJSON生成時にサーバサイドに移動したい
    let desc = (author!.desc || '').trim()
    desc = desc.replace(/src="\.\.\/images\/wikipedia_logo_rounded\.png"/g, `src="${process.env.URL_BASE}images/wikipedia_logo_rounded.png"`)

    return {
      author,
      desc,
      showDesc: desc.length > 0,
      bornOn: parseDate(author.born_on),
      diedOn: parseDate(author.died_on)
    }
  }
})
</script>

<style lang="scss" scoped>
.author {
  padding: 1.2rem;
}
h1.page-title {
  font-size: 2rem;
  font-weight: bold;
}

.title-caption {
  font-size: 0.7rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
  .kana {
    margin-right: 1rem;
  }
}

.date {
  font-size: 0.7rem;
  margin: 1rem 0 2rem;
}

.description {
  .head {
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
  .workings {
    .title {
      text-decoration: none;
    }
  }
}
</style>
