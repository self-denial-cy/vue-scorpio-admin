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

  public setNext(next: Chain) {
    this.next = next;
  }

  public abstract canHandle(): boolean;
  public abstract doHandle(): unknown;
  public abstract errHandle(): unknown;

  // 第一种执行方式，依次尝试链上的节点，一旦能成功处理就返回
  public handle(): unknown {
    if (this.canHandle()) {
      return this.doHandle();
    } else if (this.next) {
      return this.next.handle();
    } else {
      this.errHandle();
    }
  }

  // 第二种执行方式，依次尝试链上的节点，全部尝试完才返回，遇到失败就结束
  public handleAll(): unknown {
    if (!this.canHandle()) {
      this.errHandle();
    }
    if (this.next) {
      this.doHandle();
      return this.next.handleAll();
    } else {
      return this.doHandle() ?? true;
    }
  }

  // 第三种执行方式，依次尝试链上的节点，全部尝试完才返回且返回所有处理结果，遇到失败就结束
  public handleAllResult(): unknown[] {
    if (!this.canHandle()) {
      this.errHandle();
    }
    this.results.push(this.doHandle());
    if (this.next) {
      return [...this.results, ...this.next.handleAllResult()];
    } else {
      return this.results;
    }
  }
}

export class ChainNode extends Chain {
  private condition: () => boolean;
  private action?: Helper.Nullable<() => unknown>;
  private errAction?: Helper.Nullable<() => unknown>;

  constructor(
    condition: () => boolean,
    action?: Helper.Nullable<() => unknown>,
    errAction?: Helper.Nullable<() => unknown>
  ) {
    super();
    this.condition = condition;
    this.action = action;
    this.errAction = errAction;
  }

  public canHandle(): boolean {
    return this.condition();
  }

  public doHandle(): unknown {
    if (this.action) {
      return this.action();
    }
  }

  public errHandle(): unknown {
    if (this.errAction) {
      return this.errAction();
    } else {
      throw new Error('ChainNode Error');
    }
  }
}

export class ChainBoolNode extends Chain {
  private condition: () => boolean;
  private result: boolean;

  constructor(condition: () => boolean) {
    super();
    this.condition = condition;
    this.result = false;
  }

  public canHandle(): boolean {
    this.result = this.condition();
    return this.result;
  }

  public doHandle(): unknown {
    return this.result;
  }

  public errHandle(): unknown {
    return this.result;
  }
}

export class ChainExecuter {
  private head: Chain | null;

  constructor() {
    this.head = null;
  }

  public append(node: Chain) {
    if (!this.head) {
      this.head = node;
      return;
    }
    this.head.setNext(node);
  }

  public execute() {
    if (!this.head) {
      throw new Error('At least one node on the chain');
    } else {
      return this.head.handle();
    }
  }

  public executeAll() {
    if (!this.head) {
      throw new Error('At least one node on the chain');
    } else {
      return this.head.handleAll();
    }
  }

  public executeAllResult() {
    if (!this.head) {
      throw new Error('At least one node on the chain');
    } else {
      return this.head.handleAllResult();
    }
  }
}
