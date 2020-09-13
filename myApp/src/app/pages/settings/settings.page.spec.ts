import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

//Page
import { SettingsPage } from './settings.page';

//Custom Components
import { SettingFormComponentModule } from '../../components/setting-form/setting-form.module';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: [IonicModule.forRoot(), SettingFormComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
