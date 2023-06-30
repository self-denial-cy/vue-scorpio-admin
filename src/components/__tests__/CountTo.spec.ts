import { mount } from '@vue/test-utils';
import CountTo from '../CountTo.vue';

describe('CountTo component test', () => {
  it('should render content after animation', () => {
    expect(CountTo).toBeTruthy();
    const wrapper = mount(CountTo, {
      props: {
        endValue: 1000,
        duration: 1000
      }
    });
    setTimeout(() => {
      expect(wrapper.html()).toContain(1000);
    }, 1000);
  });
});
