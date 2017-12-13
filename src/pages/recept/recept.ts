import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";

/**
 * Generated class for the ReceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recept',
  templateUrl: 'recept.html',
  template: `
    <form [formGroup]="todo" (ngSubmit)="logForm()">
      <ion-item>
        <ion-label>Schema eerste temperatuur</ion-label>
        <ion-input type="text" formControlName="temperature"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Schema eerste temp tijd</ion-label>
        <ion-input type="text" formControlName="time"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Schema tweede temperatuur</ion-label>
        <ion-input type="text" formControlName="temperature2"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Schema tweede temp tijd</ion-label>
        <ion-input type="text" formControlName="time2"></ion-input>
      </ion-item>
      <button ion-button type="submit" [disabled]="!todo.valid">Submit</button>
    </form>`
})
export class ReceptPage {

  private todo;

  constructor(private bluetoothSerial: BluetoothSerial, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    bluetoothSerial.enable();
    this.todo = this.formBuilder.group({
      temperature: ['', Validators.required],
      temperature2: ['', Validators.required],
      time: ['', Validators.required],
      time2: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptPage');
  }

  logForm(){
    console.log(this.todo.value)
    this.bluetoothSerial.write(this.todo.value);
  }
}
