import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {ReceptProvider} from "../../providers/recept/recept";
import {ReceptStap} from "../../models/ReceptStap";

/**
 * Generated class for the ReceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recept',
  templateUrl: 'recept.html'
})
export class ReceptPage {

  private receptForm;

  constructor(private receptProvider: ReceptProvider, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.receptForm = this.formBuilder.group({
      temperature1: ['', Validators.required],
      temperature2: ['', Validators.required],
      time1: ['', Validators.required],
      time2: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptPage');
  }

  storeForm(){
    let receptStap1 = new ReceptStap(this.receptForm.value.temperature1, this.receptForm.value.time1);
    let receptStap2 = new ReceptStap(this.receptForm.value.temperature2, this.receptForm.value.time2);
    this.receptProvider.addReceptStap(receptStap1);
    this.receptProvider.addReceptStap(receptStap2);
  }
}
