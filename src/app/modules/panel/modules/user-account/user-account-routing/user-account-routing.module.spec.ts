import { UserAccountRoutingModule } from './user-account-routing.module';

describe('UserAccountRoutingModule', () => {
  let userAccountRoutingModule: UserAccountRoutingModule;

  beforeEach(() => {
    userAccountRoutingModule = new UserAccountRoutingModule();
  });

  it('should create an instance', () => {
    expect(userAccountRoutingModule).toBeTruthy();
  });
});
