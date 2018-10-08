import { PanelRoutingModule } from './panel-routing.module';

describe('PanelRoutingModule', () => {
  let panelRoutingModule: PanelRoutingModule;

  beforeEach(() => {
    panelRoutingModule = new PanelRoutingModule();
  });

  it('should create an instance', () => {
    expect(panelRoutingModule).toBeTruthy();
  });
});
