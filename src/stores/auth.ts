import { useRouteStore, useTabStore } from '@/stores';
import { getToken, getUserInfo, setUserInfo } from '@/helpers';
import { router } from '@/router';

interface AuthState {
  token: string;
  userInfo: UserInfo;
}

export const useAuthStore = defineStore('auth', {
  state(): AuthState {
    return {
      token: getToken(),
      userInfo: getUserInfo()
    };
  },
  getters: {
    isLogin(state) {
      return !!state.token;
    }
  },
  actions: {
    // 设置用户角色
    setUserRole(role: RoleType) {
      const { resetRouteStore, init: routeInit } = useRouteStore();
      const { init: tabInit } = useTabStore();
      const userInfo: UserInfo = {
        ...this.userInfo,
        role: role
      };
      setUserInfo(userInfo); // 缓存用户信息
      this.userInfo = userInfo;
      resetRouteStore(); // 清空异步路由，只保留初始路由表
      routeInit(); // 重新生成路由表
      tabInit(unref(router.currentRoute)); // 重新生成多页签列表
    }
  }
});
