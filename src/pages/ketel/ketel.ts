import {Component, NgZone} from "@angular/core";
import {IonicPage, NavController, NavParams, Events} from "ionic-angular";
import {KetelDataProvider} from "../../providers/ketel-data/ketel-data";
import {Observable} from "rxjs";

/**
 * Generated class for the KetelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-ketel',
    templateUrl: 'ketel.html',
})
export class KetelPage {

    private temp: any = 10.5;
    private data: Array<string> = [];
    private ketel: any;
    private dataSubscription: Observable<any>;
    private ledOn: boolean = false;

    constructor(public events: Events,
                private zone: NgZone,
                public ketelDataProvider: KetelDataProvider,
                public navCtrl: NavController,
                public navParams: NavParams) {
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                console.log('force update the screen');
            });
        });
    }

    getTemp() {
        this.ketelDataProvider.temp;
    }

    ionViewDidEnter() {
        this.getData();
    }

    setTemp(temperature: any) {
        this.temp = temperature;
    }

    getData() {
        this.dataSubscription = this.ketelDataProvider.bluetoothSerial.subscribe('\n');
        this.dataSubscription.subscribe(
            (data) => {
                this.data.push(data);
                let ketelObj = JSON.parse(data);
                // this.ketel = ketelObj;
                this.temp = ketelObj.temp;
                this.events.publish('updateScreen');
            });
    }

    sendLedOn() {
        this.ketelDataProvider.sendCommand("PMPON");
        this.ledOn = true;
    }

}
