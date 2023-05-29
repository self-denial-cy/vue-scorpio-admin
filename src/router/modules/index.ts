import type { RouteRecordRaw } from 'vue-router';
import { generateDynamicRoutes } from '@/helpers/route';

const modules = import.meta.glob('./**/*.ts', { eager: true }) as Record<string, { route: RouteRecordRaw }>;

export const dynamicRoutes = generateDynamicRoutes(modules);
