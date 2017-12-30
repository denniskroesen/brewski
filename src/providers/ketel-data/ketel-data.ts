import {Injectable} from "@angular/core";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {AlertController} from "ionic-angular";
import {Observable} from "rxjs";
import {KetelModel} from "../../models/KetelModel";

/*
 Generated class for the KetelDataProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class KetelDataProvider {

    get ketelModel(): KetelModel {
        return this._ketelModel;
    }

    public unpairedDevices: any;
    public pairedDevices: any;
    public gettingDevices: Boolean;
    private connectedAddress: any;
    public dataSubscription: Observable<any>;
    private _ketelModel: KetelModel;

    constructor(public bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
        bluetoothSerial.enable();
        this._ketelModel = new KetelModel();
    }

    startScanning() {
        this.pairedDevices = null;
        this.unpairedDevices = null;
        this.gettingDevices = true;
        this.bluetoothSerial.discoverUnpaired().then((success) => {
                this.unpairedDevices = success;
                this.gettingDevices = false;
                // success.forEach(element => {
                //     alert(element.name);
                // });
            },
            (err) => {
                console.log(err);
            })

        this.bluetoothSerial.list().then((success) => {
                this.pairedDevices = success;
            },
            (err) => {

            })
    }

    success = (data) => alert(data);
    fail = (error) => alert(error);

    selectDevice(address: any) {

        let alert = this.alertCtrl.create({
            title: 'Connect',
            message: 'Do you want to connect?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Connect',
                    handler: () => {
                        this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
                        this.connectedAddress = address;
                        this.subscribeToData();
                    }
                }
            ]
        });
        alert.present();

    }

    disconnect() {
        let alert = this.alertCtrl.create({
            title: 'Disconnect?',
            message: 'Do you want to Disconnect?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Disconnect',
                    handler: () => {
                        this.bluetoothSerial.disconnect();
                    }
                }
            ]
        });
        alert.present();
    }

    sendCommand(command: string) {
        this.bluetoothSerial.write("<" + command + ">");
    }

    subscribeToData() {
        this.dataSubscription = this.bluetoothSerial.subscribe('\n');
        this.dataSubscription.subscribe(
            (data) => {
                // alert(data);
                let ketelObj = JSON.parse(data);
                this._ketelModel.temperature = ketelObj.temp;
                this._ketelModel.updated();
            });
    }
}
