import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReceptProvider} from "../../providers/recept/recept";

/**
 * Generated class for the ReceptrunnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receptrunner',
  templateUrl: 'receptrunner.html',
})
export class ReceptrunnerPage {

  constructor(public receptProvider: ReceptProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptrunnerPage');
  }

}
