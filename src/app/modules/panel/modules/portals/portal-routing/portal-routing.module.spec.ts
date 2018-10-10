import { PortalRoutingModule } from './portal-routing.module';

describe('PortalRoutingModule', () => {
  let portalRoutingModule: PortalRoutingModule;

  beforeEach(() => {
    portalRoutingModule = new PortalRoutingModule();
  });

  it('should create an instance', () => {
    expect(portalRoutingModule).toBeTruthy();
  });
});
