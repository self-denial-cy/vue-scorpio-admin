// 提取 css 变量的值
export function getCssVar(key: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(key);
}
