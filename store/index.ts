import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author } from '@/types/author'
import { Work } from '@/types/work'

export const state = () => ({
  personDetailArray: [] as Author[],
  personDetail: {} as { [id:number]: Author},
  worksArray: [] as Work[],
  works: {} as { [id:number]: Work}
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ state },{$axios}) {
    try {
      state.personDetailArray = await $axios.$get(process.env.PERSON_DETAIL_URL!)
      state.personDetailArray.forEach(e => {
        state.personDetail[e.id] = e
      });

      state.worksArray = await $axios.$get(process.env.BOOK_CARD_URL!)
      state.worksArray.forEach(e => {
        state.works[e.title.work_id] = e
      });
    } catch (e) {
      console.error(e)
    }
  }
}