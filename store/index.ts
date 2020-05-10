import { GetterTree, ActionTree, MutationTree } from 'vuex'
require('dotenv').config()


export const state = () => ({
  personDetailArray: [] as any[],
  personDetail: {} as any
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ state },{$axios}) {
    try {
      state.personDetailArray = (await $axios.get(process.env.NUXT_ENV_PERSON_DETAIL_URL!)).data
      state.personDetailArray.forEach(e => {
        state.personDetail[e.id] = e
      });

    } catch (e) {
      console.error(e)

    }
  }
}