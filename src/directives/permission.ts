import type { App, Directive } from 'vue';
import { usePermission } from '@/composables';

export default function setupPermissionDirective(app: App) {
  app.directive('permission', permissionDirective);
}

export type PermissionDirective = Directive<HTMLElement, RoleType | RoleType[]>;

const permissionDirective: PermissionDirective = {
  beforeMount(el, binding) {
    handlePermission(el, binding.value);
  },
  beforeUpdate(el, binding) {
    handlePermission(el, binding.value);
  }
};

function handlePermission(el: HTMLElement, permission: RoleType | RoleType[]) {
  if (!permission || !permission.length) return;
  const { hasPermission } = usePermission();
  if (!hasPermission(permission)) {
    el.style.display = 'none';
  }
}
