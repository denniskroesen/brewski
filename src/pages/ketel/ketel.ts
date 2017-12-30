import {Component, NgZone} from "@angular/core";
import {IonicPage, NavController, NavParams, Events} from "ionic-angular";
import {KetelDataProvider} from "../../providers/ketel-data/ketel-data";
import {KetelDataMockProvider} from "../../providers/ketel-data-mock/ketel-data-mock";

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

    private ledOn: boolean = false;

    constructor(public events: Events,
                private zone: NgZone,
                public ketelDataProvider: KetelDataMockProvider,
                public navCtrl: NavController,
                public navParams: NavParams) {
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                console.log('force update the screen');
            });
        });
    }

    turnHeat(heater: number) {
        let command = "HEAT" + heater;
        this.ketelDataProvider.sendCommand(command);
    }


    ionViewDidEnter() {
        this.getData();
    }

    getData() {
        this.ketelDataProvider.ketelModel.updates().subscribe(
            (data) => {
                // alert(data);
                this.events.publish('updateScreen');
            });
    }

    sendLedOn() {
        this.ketelDataProvider.sendCommand("PMPON");
        this.ledOn = true;
    }

}
