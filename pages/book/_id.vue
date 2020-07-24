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
      <h3 class="head">
        作品について
      </h3>
      <div class="text">
        <p v-show="work.work_note" class="work_note">
          {{ work.work_note }}
        </p>
        <p v-show="work.note" class="note">
          {{ work.note | stripHTML }}
        </p>
      </div>
      <div v-show="work.first_appearance" class="first-edition">
        <p>初出： {{ work.first_appearance }}</p>
      </div>
    </div>
    <iframe class="work-body" :src="workHTMLURL" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Book',
  components: {},
  filters: {
    stripHTML (text: string): string {
      return text.replace(/<[^>]*>?/gm, '')
    }
  },
  asyncData ({ params, payload, store }) {
    try {
      const id = params.id
      if (!id && !payload) {
        return
      }
      const book = payload || store.getters.getWork(id)

      return {
        book
      }
    } catch (e) {
      console.error(e)
      return {
        book: {}
      }
    }
  },
  data () {
    return {
      book: undefined
    }
  },
  computed: {
    work () {
      return this.book ? this.book!.work : {}
    },
    showDescription () {
      const w = this.work
      if (!w) {
        return
      }
      return w.work_note || w.note || w.first_appearance
    },
    authorID () {
      if (!this.book) { return }
      if (!this.book.title) { return }
      const authorId = this.book.title.author_id.toString()
      return '000000'.concat(authorId).slice(authorId.length)
    },
    workHTMLURL () {
      const downloadHtml = (this.book.download || []).find(d => d.filename && d.filename.endsWith('html'))
      if (!(this.authorID && downloadHtml)) { return }
      return `https://www.aozora.gr.jp/cards/${this.authorID}/files/${downloadHtml.filename}`
    }

  },
  mounted () {
  },
  methods: {
    async getWorkHTMLBody () {
      const downloadHtml = (this.book.download || []).find(d => d.filename && d.filename.endsWith('html'))
      if (!downloadHtml) { return }
      const url = `https://www.aozora.gr.jp/cards/${this.authorID}/files/${downloadHtml.filename}`
      const html = await this.$axios.$get(url)
      const e = document.createElement('div')
      e.innerHTML = html
      const mainText = e.querySelector('.main_text')
      if (!mainText) {
        this.workHTMLBody = html
      } else {
        this.workHTMLBody = mainText.innerHTML
      }
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
.work-body {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
</style>
