import {Injectable} from "@angular/core";
import {AlertController} from "ionic-angular";
import {KetelModel} from "../../models/KetelModel";

/*
 Generated class for the KetelDataMockProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class KetelDataMockProvider {

    get ketelModel(): KetelModel {
        return this._ketelModel;
    }

    public unpairedDevices: any;
    public pairedDevices: any;
    public gettingDevices: Boolean;
    private connectedAddress: any;

    private _ketelModel = new KetelModel();

    constructor(private alertCtrl: AlertController) {
        this._ketelModel = new KetelModel();
        this._ketelModel.temperature = 21.0;
        this.setTempTimeout();
    }

    private setTempTimeout() {
        let TIME_IN_MS = 1000;
        setTimeout(() => {
            this.updateTemp();
            // somecode
        }, TIME_IN_MS);
    }

    updateTemp() {
        let newTemp;
        if (this._ketelModel.heater1 &&
            this._ketelModel.heater2 &&
            this._ketelModel.heater3) {
            newTemp = this._ketelModel.temperature + 0.05;
        } else if (this._ketelModel.heater1 &&
            this._ketelModel.heater2 && !this._ketelModel.heater3) {
            newTemp = this._ketelModel.temperature + 0.02;
        } else if (this._ketelModel.heater1 && !this._ketelModel.heater2 && !this._ketelModel.heater3) {
            newTemp = this._ketelModel.temperature + 0.01;
        } else if (!this._ketelModel.heater1 &&
            !this._ketelModel.heater2 &&
            !this._ketelModel.heater3 &&
            this._ketelModel.temperature > 20) {
            newTemp = this._ketelModel.temperature - 0.01;
        }
        this._ketelModel.temperature = Math.round(newTemp * 1000)/1000;
        this.setTempTimeout();
    }

    startScanning() {
        this.gettingDevices = true;
        this.pairedDevices = null;
        let device = {name: "mockDevice", address: "mockaddress"};
        this.pairedDevices.push(device);
        this.unpairedDevices = null;
        this.gettingDevices = false;
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
                    }
                }
            ]
        });
        alert.present();
    }

    sendCommand(command: string) {
        if (command == "HEAT1") {
            this._ketelModel.heater1 = true;
            this._ketelModel.heater2 = false;
            this._ketelModel.heater3 = false;
        } else if (command == "HEAT2") {
            this._ketelModel.heater1 = true;
            this._ketelModel.heater2 = true;
            this._ketelModel.heater3 = false;
        } else if (command == "HEAT3") {
            this._ketelModel.heater1 = true;
            this._ketelModel.heater2 = true;
            this._ketelModel.heater3 = true;
        } else if (command == "HEAT0") {
            this._ketelModel.heater1 = false;
            this._ketelModel.heater2 = false;
            this._ketelModel.heater3 = false;
        }
    }

    subscribeToData() {
    }

}
