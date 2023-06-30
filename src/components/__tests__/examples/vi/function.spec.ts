describe('function simulation', () => {
  it('spyOn', () => {
    let apples = 0;
    const obj = {
      getApples: () => 13
    };

    const spy = vi.spyOn(obj, 'getApples').mockImplementation(() => apples);
    apples = 1;

    expect(obj.getApples()).toBe(1);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(1);
  });

  it('fn', () => {
    const getApples = vi.fn(() => 0);

    getApples();

    expect(getApples).toHaveBeenCalled();
    expect(getApples).toHaveReturnedWith(0);

    getApples.mockReturnValueOnce(5);

    const res = getApples();
    expect(res).toBe(5);
    expect(getApples).toHaveNthReturnedWith(2, 5);
  });
});

function getLatest(index = messages.items.length - 1) {
  return messages.items[index];
}

const messages = {
  items: [
    { message: 'Simple test message', from: 'Testman' }
    // ...
  ],
  getLatest // 也可以是一个 `getter 或 setter 如果支持`
};

describe('reading messages', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get the latest message with a spy', () => {
    const spy = vi.spyOn(messages, 'getLatest');
    expect(spy.getMockName()).toEqual('getLatest');

    expect(messages.getLatest()).toEqual(messages.items[messages.items.length - 1]);

    expect(spy).toHaveBeenCalledTimes(1);

    // @ts-expect-error mockImplementationOnce
    spy.mockImplementationOnce(() => 'access-restricted');
    expect(messages.getLatest()).toEqual('access-restricted');

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should get with a mock', () => {
    const mock = vi.fn().mockImplementation(getLatest);

    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    expect(mock).toHaveBeenCalledTimes(1);

    mock.mockImplementationOnce(() => 'access-restricted');
    expect(mock()).toEqual('access-restricted');

    expect(mock).toHaveBeenCalledTimes(2);

    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
