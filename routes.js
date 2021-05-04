import axios from 'axios'

export default async function routes () {
  try {
    const authors = await axios.get(process.env.NUXT_ENV_PERSON_DETAIL_URL).then((res) => {
      return res.data.map((p) => {
        return {
          route: `/authors/${p.id}`,
          payload: p
        }
      })
    })
    const works = await axios.get(process.env.NUXT_ENV_BOOK_CARD_URL).then((res) => {
      return res.data.map((b) => {
        return {
          route: `/works/${b.title.work_id}`,
          payload: b
        }
      })
    })
    return authors.concat(works)
  } catch (e) {
    console.error(e)
  }
}
