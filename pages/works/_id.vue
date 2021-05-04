<template>
  <section v-if="book" class="book">
    <section class="detail">
      <div v-if="book.title" class="title">
        <div class="titles">
          <h1 class="book-title">
            {{ book.title.title }}
          </h1>
          <h2 class="book-subtitle">
            {{ book.title.subtitle }}
          </h2>
        </div>
        <p class="caption">
          <span class="title-caption">
            {{ book.title.title_kana }}
          </span>
          <span class="title-caption">
            {{ book.title.subtitle_kana }}
          </span>
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
    <section class="icons">
      <h2>縦書き表示・ダウンロード・シェア</h2>
      <ul class="circles">
        <li v-for="e in icons" :key="e.name" class="icon">
          <button
            v-if="e.key === 'twitter'"
            class="link"
            @click="shareOnTwitter"
          >
            <img :class="e.key" :src="`images/${e.filename}`" :alt="e.name">
          </button>
          <button
            v-else-if="e.download"
            class="link"
            :href="e.url"
            :download="true"
          >
            <img :class="e.key" :src="`images/${e.filename}`" :alt="e.name">
          </button>
          <a
            v-else
            class="link"
            target="_blank"
            rel="noreferrer"
            :href="e.url"
          >
            <img :class="e.key" :src="`images/${e.filename}`" :alt="e.name">
          </a>
        </li>
      </ul>
      <p class="excuse">
        <span> ファイルのご利用については、</span>
        <span>「<a href="https://www.aozora.gr.jp/guide/kijyunn.html">収録ファイルの取扱い基準</a>」をご確認ください。</span>
      </p>
      <h2>本文</h2>
    </section>
    <section class="text-body">
      <iframe
        :src="workHTMLURL"
        :title="`${book.title.title}の本文`"
        loading="lazy"
        frameborder="0"
        :class="{'with-subtitle': book.title.subtitle}"
      />
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Work } from "types/work";

export default Vue.extend({
  name: "Book",
  components: {},
  validate({ params }) {
    return /\d+/.test(params.id);
  },
  async asyncData({ params, payload, $axios }) {
    try {
      const id = Number.parseInt(params.id)
      const books: Work[] = payload || await $axios.$get(process.env.BOOK_CARD_URL!) || []
      const book: Work = payload || books.find((e: Work) => e.title.work_id === id)

      const authorId = book.title.author_id.toString();
      const workId = book.title.work_id;

      const filledAuthorId = "000000".concat(authorId).slice(authorId.length);
      const downloadUrlBase = `https://www.aozora.gr.jp/cards/${filledAuthorId}/files/`;
      const downloadHtml = (book.download || []).find( d => d.filename && d.filename.endsWith("html"));
      const workHTMLURL = downloadHtml ? `${downloadUrlBase}${downloadHtml.filename}` : undefined;
      const downloadTextZip = (book.download || []).find(d => d.filetype.startsWith("テキストファイル"));
      const textZipUrl = downloadTextZip ? `${downloadUrlBase}${downloadTextZip.filename}` : undefined;

      const w = book.work;
      const note = w.note ? w.note.replace(/<[^>]*>?(\n)?/gm, "") : "";
      const showDescription = [w.work_note, note, w.first_appearance].some(str => str && str.length > 0);

      const authorNames = book.author.map(a => a.author_name);
      const titles = book.title.title.split(" ").join("+");
      const icons = [
        {
          name: "青空inBrowser",
          key: "aozora_in_browser",
          filename: 'vertical-document.png',
          url: `http://aozora.binb.jp/reader/main.html?cid=${workId}`,
        },
        {
          name: "えあ草紙",
          key: "air_zoshi",
          filename: 'opened-book.png',
          url: `https://www.satokazzz.com/airzoshi/reader.php?action=aozora&id=${workId}`
        },
        {
          name: "AmazonKindle",
          key: "amazon",
          filename: 'amazon.png',
          url: `https://www.amazon.co.jp/s?rh=n%3A2275256051&k=${authorNames.join("+")}+${titles}`
        },
        {
          name: "ダウンロード",
          key: "download",
          filename: 'download.png',
          url: textZipUrl,
          download: true
        },
        {
          name: "ツイッター",
          key: "twitter",
          filename: 'twitter_white.png',
        }
      ];
      return {
        book,
        work: w,
        note,
        showDescription,
        workHTMLURL,
        icons
      };
    } catch (e) {
      console.error(e);
    }
  },
  data(): {
    book: Work | undefined;
    workHTMLBody: string;
    workHTMLURL: string;
  } {
    return {
      book: undefined,
      workHTMLBody: "",
      workHTMLURL: ""
    };
  },
  methods: {
    shareOnTwitter() {
      const authorNames = this.book!.author!.map(a => a.author_name);
      const titles = this.book!.title!.title.split(" ").join("+");
      return window.open(
        `https://twitter.com/intent/tweet?text=${`${authorNames}『${titles}』%0a${window.location}%0a`}&hashtags=青空文庫,AozoraBunko`
      )
    }
  }
});
</script>

<style lang="scss" scoped>
section.detail, section.icons {
  z-index: 100;
  position: relative;
  background-color: $base-background;
  padding: 1.2rem;
}
.titles {
  margin-bottom: 0.5rem;
  .book-title {
    font-size: 2rem;
    font-weight: bold;
  }
  .book-subtitle {
    font-size: 1.2rem;
    font-weight: bold;
  }
}

.caption {
  font-size: 0.7rem;
  font-weight: normal;
  margin-bottom: 2rem;
  span {
    display: inline-block;
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
section.icons {
  padding: 1.2rem 1.2rem 0;
  border-bottom: 1px solid $border;
  margin-bottom: 0.5rem;
  h2 {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 0.2rem;
  }
  .circles {
    display: flex;
    justify-content: space-around;
    margin: 0;
  }
  li.icon {
    border: 2px solid $dark-gray;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    .link {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      img {
        max-width: 75%;
        max-height: 75%;
        &.amazon {
          max-width: 90%;
        }
        &.twitter {
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  p.excuse {
    font-size: 0.9rem;
    margin: 1rem 0 3rem;
    span {
      display: inline-block;
    }
  }
}
.text-body {
  position: relative;
  left: -10%;
  width: 120%;
  overflow: hidden;
  h2 {
    padding-left: 10%;
    position: relative;
    z-index: 0;
  }
  iframe {
    border: 1px solid $gray;
    border-top: none;
    width: 100%;
    height: calc(100vh + 150px);
    position: relative;
    z-index: 10;
    top: -250px;
    overflow: scroll;
    padding-bottom: 0.5rem;
    &.with-subtitle {
      top: -350px;
      height: calc(100vh + 250px);
    }
  }
}
</style>
