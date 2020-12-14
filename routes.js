import axios from 'axios'

const AUTHOR_ID = 879 // 芥川龍之介
export default async function routes () {
  try {
    const bookIds = []
    const authors = await axios.get(process.env.NUXT_ENV_PERSON_DETAIL_URL).then((res) => {
      return res.data.filter(p => p.id === AUTHOR_ID).map((p) => {
        bookIds.push(...p.work.map(w => w.work_id))
        return {
          route: `/author/${p.id}`,
          payload: p
        }
      })
    })
    const books = await axios.get(process.env.NUXT_ENV_BOOK_CARD_URL).then((res) => {
      return res.data.filter(b => bookIds.includes(b.title.work_id)).map((b) => {
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
