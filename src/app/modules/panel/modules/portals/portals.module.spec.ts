import { PortalsModule } from './portals.module';

describe('PortalsModule', () => {
  let portalsModule: PortalsModule;

  beforeEach(() => {
    portalsModule = new PortalsModule();
  });

  it('should create an instance', () => {
    expect(portalsModule).toBeTruthy();
  });
});
