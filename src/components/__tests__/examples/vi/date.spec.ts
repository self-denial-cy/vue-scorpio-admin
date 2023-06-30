const businessHours = [9, 17];

function purchase() {
  const currentHour = new Date().getHours();
  const [open, close] = businessHours;
  if (currentHour > open && currentHour < close) {
    return { message: 'success' };
  }
  return { message: 'error' };
}

describe('purchasing flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('allows purchases within business hours', () => {
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);
    expect(purchase()).toEqual({ message: 'success' });
  });
});
