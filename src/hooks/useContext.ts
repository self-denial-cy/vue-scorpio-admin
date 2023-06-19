import type { InjectionKey } from 'vue';

export function useContext<T>() {
  const key: InjectionKey<T> = Symbol();

  function useProvide(context: T) {
    provide(key, context);
    return context;
  }

  function useInject() {
    return inject(key) as T;
  }

  return { useProvide, useInject };
}
