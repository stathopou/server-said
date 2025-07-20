import { IncomingMessage } from './incoming-message';

describe('IncomingMessage', () => {
  it('should be defined', () => {
    expect(new IncomingMessage()).toBeDefined();
  });
});
