import { useAuthStore } from '@/stores';
import { isArray, isString } from '@/utils';

export function usePermission() {
  function hasPermission(permission: RoleType | RoleType[]) {
    const { userInfo } = useAuthStore();
    let has = userInfo.role === 'super';
    if (!has) {
      if (isArray(permission)) {
        has = permission.includes(userInfo.role);
      }
      if (isString(permission)) {
        has = permission === userInfo.role;
      }
    }
    return has;
  }

  return {
    hasPermission
  };
}
