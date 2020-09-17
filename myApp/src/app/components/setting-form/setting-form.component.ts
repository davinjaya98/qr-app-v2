import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

//Custom Service
import { StorageService } from '../../service/storage';

@Component({
  selector: 'comp-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.scss'],
})
export class SettingFormComponent implements OnInit {
  @Input() label: string;

  //Credentials setting
  protected u: string = "dcatalyst";
  protected p: string = "12345";
  //Credentials setting

  settingForm: FormGroup;

  constructor(formBuilder: FormBuilder, public toastCtrl: ToastController, public alertCtrl: AlertController, private storage: StorageService) {
    this.settingForm = formBuilder.group({
      hostName: ['', Validators.required],
      endpoint: ['', Validators.required],
      location: ['', Validators.required],
      pic: ['', Validators.required]
    });
    this.storage.getObject('setting').then((setting: any) => {
      if (setting) {
        // let setting = JSON.parse(value);
        //Update form with value from storage
        this.settingForm.controls.hostName.setValue(setting.connectedHost);
        this.settingForm.controls.endpoint.setValue(setting.decryptEndpoint);
        this.settingForm.controls.location.setValue(setting.location);
        this.settingForm.controls.pic.setValue(setting.personInCharge);
      }
    });
  }

  ngOnInit() { }

  submitSetting() {
    this.settingForm.markAllAsTouched()
    if (this.settingForm.valid) {
      this.triggerCredentialsAlert();
    }
  }

  async saveSetting() {
    new Promise((resolve, reject) => {
      this.storage.setObject('setting', {
        connectedHost: this.settingForm.value.hostName,
        decryptEndpoint: this.settingForm.value.endpoint,
        location: this.settingForm.value.location,
        personInCharge: this.settingForm.value.pic
      }).then(() => {
        this.triggerToast("Save successfully");
        resolve(true);
      }).catch(() => {
        this.triggerToast("Save failed");
        resolve(false);
      });
    })
  }

  checkCredentials(username, password) {

    if (username == this.u && password == this.p) {
      this.saveSetting().then((resp) => {
        return resp;
      });
    }
    else {
      this.triggerToast("Wrong credentials");
      return false;
    }
  }

  async triggerToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });

    toast.present();
  }

  async triggerCredentialsAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Please input the username and password',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: data => {
            return this.checkCredentials(data.username, data.password);
          }
        }
      ]
    });

    await alert.present();
  }
}
