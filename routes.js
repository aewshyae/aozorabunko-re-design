import axios from 'axios'

export default async function routes () {
  try {
    const authors = await axios.get(process.env.NUXT_ENV_PERSON_DETAIL_URL).then((res) => {
      return res.data.map((p) => {
        return {
          route: `/author/${p.id}`,
          payload: p
        }
      })
    })
    const books = await axios.get(process.env.NUXT_ENV_BOOK_CARD_URL).then((res) => {
      return res.data.map((b) => {
        return {
          route: `/book/${b.title.work_id}`,
          payload: b
        }
      })
    })
    return authors.concat(books)
  } catch (e) {
    console.error(e)
  }
}