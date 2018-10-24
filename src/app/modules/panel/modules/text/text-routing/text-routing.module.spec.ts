import { TextRoutingModule } from './text-routing.module';

describe('TextRoutingModule', () => {
  let textRoutingModule: TextRoutingModule;

  beforeEach(() => {
    textRoutingModule = new TextRoutingModule();
  });

  it('should create an instance', () => {
    expect(textRoutingModule).toBeTruthy();
  });
});
