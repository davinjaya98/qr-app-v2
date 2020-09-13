import { IonicModule } from '@ionic/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//Page
import { HomePage } from './home.page';

//Custom Components
import { TextBlockComponentModule } from '../../components/text-block/text-block.module';
import { IframeLoaderComponentModule } from '../../components/iframe-loader/iframe-loader.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), TextBlockComponentModule, IframeLoaderComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
