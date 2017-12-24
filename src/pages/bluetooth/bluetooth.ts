import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {KetelDataProvider} from "../../providers/ketel-data/ketel-data";

/**
 * Generated class for the BluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bluetooth',
    templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

    constructor(private ketelDataProvider: KetelDataProvider, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BluetoothPage');
    }

    getPairedDevices() {
        return this.ketelDataProvider.pairedDevices;
    }

    getUnpairedDevices() {
        return this.ketelDataProvider.unpairedDevices;
    }

    isGettingDevices() {
        return this.ketelDataProvider.gettingDevices;
    }

    startScanning() {
        this.ketelDataProvider.startScanning();
    }

    selectDevice(address: any) {
        this.ketelDataProvider.selectDevice(address);
    }

    disconnect() {
        this.ketelDataProvider.disconnect();
    }

}
