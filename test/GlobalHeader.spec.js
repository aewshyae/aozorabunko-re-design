import { mount } from '@vue/test-utils'
import GlobalHeader from '@/components/global-header.vue'

describe('GlobalHeader', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(GlobalHeader)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
