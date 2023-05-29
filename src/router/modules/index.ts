import type { RouteRecordRaw } from 'vue-router';
import { generateDynamicRoutes } from '@/helpers/route';

const modules = import.meta.glob('./**/*.ts', { eager: true }) as Record<string, { record: RouteRecordRaw }>;

export const dynamicRoutes: RouteRecordRaw[] = generateDynamicRoutes(modules);
