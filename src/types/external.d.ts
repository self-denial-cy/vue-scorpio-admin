import '@vue/runtime-core';

export {};

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Lottie: typeof import('vue3-lottie')['Vue3Lottie'];
  }
}
