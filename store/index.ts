import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author, AuthorWork } from '@/types/author'
import { Work } from '@/types/work'

const MAX_PARAMS_LENGTH = 65534

export const state = () => ({
  personDetailArray: [] as Author[],
  personDetail: {} as { [id: number]: Author },
  worksArray: [] as Work[],
  works: {} as { [id: number]: Work }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAuthor: state => (id: number) => {
    const author = state.personDetail[id]
    if (author) {
      return author
    }
    return state.personDetailArray.find(author => author.id == id)
  },
  getWork: state => (id: number) => {
    const work = state.works[id]
    if (work) {
      return work
    }
    return state.worksArray.find(work => work.title.work_id == id)
  }
}

export const mutations: MutationTree<RootState> = {
  setPersonDetailArray: (state, newArray: Author[]) => (state.personDetailArray = newArray),
  setPersonDetail: (state, { id, author }: { id: number, author: Author }) => (state.personDetail[id] = author),
  updatePersonDetailWorkTitle: (state, { w, needKana }: { w: AuthorWork, needKana?: boolean }) => {
    const title = `${w.title} ${w.subtitle || ""}`
    w.titleToDisplay = `${title}${needKana ? `（${w.kana_type}）` : ""}`
  },
  setWorksArray: (state, newArray: Work[]) => (state.worksArray = newArray),
  setWork: (state, { id, work }: { id: number, work: Work }) => (state.works[id] = work),
}

export const actions: ActionTree<RootState, RootState> = {
  async initPersonDetail({ commit }, $axios) {
    try {
      const personDetailArray: Author[] = await $axios.$get(process.env.PERSON_DETAIL_URL!)
      commit('setPersonDetailArray', personDetailArray)

      personDetailArray.forEach(author => {
        commit('setPersonDetail', { id: author.id, author })
      });

    } catch (e) {
      console.error(e)
    }

  },
  async initWorks({ commit }, $axios) {
    try {
      const worksArray: Work[] = await $axios.$get(process.env.BOOK_CARD_URL!)
      commit('setWorksArray', worksArray)
    } catch (e) {
      console.error(e)
    }
  },
  initAuthorWork({ commit }, author) {
    // TODO 作品を頭文字であ行〜わ行に分類したいが、作品にかながついていないのでできない
    const allWorks = (author.work || []).concat(author.wip || [])
    allWorks.forEach((w1: AuthorWork) => {
      allWorks.forEach((w2: AuthorWork) => {
        if (w1.work_id === w2.work_id) { return }
        const needKana = w1.title === w2.title && w1.subtitle === w2.subtitle
        commit('updatePersonDetailWorkTitle', { w: w1, needKana })
        commit('updatePersonDetailWorkTitle', { w: w2, needKana })
      })
    })

  }
}