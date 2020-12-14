import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author } from '@/types/author'
import { Work } from '@/types/work'

const MAX_PARAMS_LENGTH = 65534

export const state = () => ({
  personDetailsArray: [] as Author[],
  personDetails: {} as { [id: number]: Author },
  worksArray: [] as Work[],
  works: {} as { [id: number]: Work }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAuthor: state => (id: number) => {
    const author = state.personDetails[id]
    if (author) {
      return author
    }
    return state.personDetailsArray.find(author => author.id == id)
  },
  getWork: state => (id: number) => {
    const work = state.works[id]
    if (work) {
      return work
    }
    return state.worksArray.find(work => work.title.work_id == id)
  },
  isPersonDetailsInited: ({personDetailsArray}) => {
    return personDetailsArray.length > 0
  },
  isWorksInited: ({worksArray}) => {
    return worksArray.length > 0
  }
}

export const mutations: MutationTree<RootState> = {
  setPersonDetailsArray: (state, newArray: Author[]) => (
    state.personDetailsArray = newArray
  ),
  setPersonDetail: (state, { id, author }: { id: number, author: Author }) => (
    state.personDetails[id] = author
  ),
  setWorksArray: (state, newArray: Work[]) => (
    state.worksArray = newArray
  ),
  setWork: (state, { id, work }: { id: number, work: Work }) => (
    state.works[id] = work
  ),
}

export const actions: ActionTree<RootState, RootState> = {
  async initPersonDetails({ commit }, $axios) {
    try {
      const personDetailsArray: Author[] = await $axios.$get(process.env.PERSON_DETAIL_URL!)
      commit('setPersonDetailsArray', personDetailsArray)

      personDetailsArray.forEach(author => {
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
}