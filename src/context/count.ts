import { useContext } from '@/hooks';
import type { Ref } from 'vue';

interface CountContext {
  count: Ref<number>;
  setCount: (count: number) => void;
}

const { useProvide: useCountProvide, useInject: useCountInject } = useContext<CountContext>();

export function useCountContext() {
  let count = $ref(0);
  function setCount(val: number) {
    count = val;
  }

  const countContext: CountContext = {
    count: $$(count),
    setCount
  };

  function useProvide() {
    return useCountProvide(countContext);
  }

  return {
    useProvide,
    useInject: useCountInject
  };
}
