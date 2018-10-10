import { CreatePortalModule } from './create-portal.module';

describe('CreatePortalModule', () => {
  let createPortalModule: CreatePortalModule;

  beforeEach(() => {
    createPortalModule = new CreatePortalModule();
  });

  it('should create an instance', () => {
    expect(createPortalModule).toBeTruthy();
  });
});
