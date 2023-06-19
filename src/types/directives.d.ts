import '@vue/runtime-core';

export {};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    vClipboard: import('./../directives/clipboard').ClipboardDirective;
    vPermission: import('./../directives/permission').PermissionDirective;
  }
}
