<template>
  <section v-if="book" class="book">
    <div v-if="book.title" class="title">
      <h1 v-if="book.title.title" class="page-title">
        {{ book.title.title }}
      </h1>
      <p class="title-caption">
        {{ book.title.title_kana }}
      </p>
      <nuxt-link class="author" :to="`/author/${book.title.person_id}`">
        {{ book.title.person_name }}
      </nuxt-link>
    </div>
    <div v-if="showDescription" class="description">
      <h2 class="head">
        作品について
      </h2>
      <div class="text">
        <p v-show="work.work_note" class="work_note">
          {{ work.work_note }}
        </p>
        <p v-show="work.note" class="note">
          {{ note }}
        </p>
      </div>
      <div v-show="work.first_appearance" class="first-edition">
        <p>初出： {{ work.first_appearance }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Work } from 'types/work'

export default Vue.extend({
  name: 'Book',
  components: {},
  validate ({ params }) {
    return /\d+/.test(params.id)
  },
  async asyncData ({ params, payload, store, $axios }) {
    try {
      const id = params.id
      if (!(payload || store.getters.isWorksInited)) {
        await store.dispatch('initWorks', $axios)
      }
      const book: Work = payload || store.getters.getWork(id)
      const authorId = book.title.author_id.toString()
      const filledAuthorId = '000000'.concat(authorId).slice(authorId.length)
      const downloadHtml = (book.download || []).find(d => d.filename && d.filename.endsWith('html'))
      const workHTMLURL = filledAuthorId && downloadHtml ? `https://www.aozora.gr.jp/cards/${filledAuthorId}/files/${downloadHtml.filename}` : undefined
      const w = book.work

      const note = w.note ? w.note.replace(/<[^>]*>?(\n)?/gm, '') : ""
      const showTexts = (...texts: Array<string | undefined>) => texts.some(str => str && str.length > 0)
      return {
        book,
        work: w,
        note,
        showDescription: showTexts(w.work_note, note, w.first_appearance),
        workHTMLURL
      }
    } catch (e) {
      console.error(e)
    }
  },
  data () {
    return {
      book: undefined,
      workHTMLBody: '',
      workHTMLURL: ''
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
  margin-bottom: 0.5rem;
  .kana {
    margin-right: 1rem;
  }
}

.date {
  font-size: 0.7rem;
  margin: 1.5rem 0;
}

.description {
  margin-top: 2rem;
  .head {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 0.2rem;
  }
  .text {
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 0.5rem 0 2rem;
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
