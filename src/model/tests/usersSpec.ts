import { User, UserStore } from '../users';

const store = new UserStore();

describe('User Model ', () => {
  it('Should have an read method', () => {
    expect(store.createUser).toBeDefined();
  });
});
