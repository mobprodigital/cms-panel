import { AllPortalsModule } from './all-portals.module';

describe('AllPortalsModule', () => {
  let allPortalsModule: AllPortalsModule;

  beforeEach(() => {
    allPortalsModule = new AllPortalsModule();
  });

  it('should create an instance', () => {
    expect(allPortalsModule).toBeTruthy();
  });
});
