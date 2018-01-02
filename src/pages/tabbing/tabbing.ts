import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabbingPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabbing',
  templateUrl: 'tabbing.html'
})
export class TabbingPage {

  ketelRoot = 'KetelPage';
  receptRoot = 'ReceptPage';
  bluetoothRoot = 'BluetoothPage';
  receptRunnerRoot = 'ReceptrunnerPage';

  constructor(public navCtrl: NavController) {}

}
