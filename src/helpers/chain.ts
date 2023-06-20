/**
 * 责任链模式
 *  - 应用场景
 *   - 获取用户 gps 定位，依次尝试使用浏览器 API、高德 API、微信 API，只要成功获取就不再向后尝试
 *   - 表单校验，依次检查条件 A、B、C 是否都满足，执行到最后确认结果
 *   - 等等
 */

abstract class Chain {
  protected next: Chain | null;
  protected results: unknown[];

  constructor() {
    this.next = null;
    this.results = [];
  }
}
