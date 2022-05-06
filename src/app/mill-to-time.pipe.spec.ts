import { MillToTimePipe } from './mill-to-time.pipe';

describe('MillToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MillToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
