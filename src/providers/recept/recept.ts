import {Injectable} from "@angular/core";
import {ReceptStap} from "../../models/ReceptStap";
import {KetelDataProvider} from "../ketel-data/ketel-data";

/*
 Generated class for the ReceptProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ReceptProvider {

    get recept(): ReceptStap[] {
        return this._recept;
    }

    public timerDisplay: string;

    private _recept: Array<ReceptStap> = [];

    private currentStepIndex: number = 0;
    private currentStep: ReceptStap;
    private running: boolean = false;
    private stepTemperatureReached: boolean = false;

    constructor(private ketelDataProvider: KetelDataProvider) {
        console.log('Hello ReceptProvider Provider');
    }

    addReceptStap(receptStap: ReceptStap) {
        this._recept.push(receptStap);
    }

    run() {
        //set the proces to running
        this.running = true;
        this.currentStep = this._recept[this.currentStepIndex];

        while (this.running) {
            setInterval(() => {
                if (!this.stepTemperatureReached) {
                    this.upTemp();
                    this.checkStepTemperature();
                } else {
                    this.startTempTimer();
                }
            }, 1000);
        }

    }

    private upTemp() {
        if (this.ketelDataProvider.ketelModel.temperature < (this.currentStep.temperatuur - 1)) {
            this.ketelDataProvider.sendCommand("HEAT3");
        } else {
            this.ketelDataProvider.sendCommand("HEAT2");
        }
    }

    private startTimer(duration) {
        let timer = duration;
        let minutes;
        let seconds;
        setInterval(() => {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.timerDisplay = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    private startTempTimer() {
        this.startTimer(this.currentStep.tijd * 60);
    }

    private checkStepTemperature() {
        if (this.ketelDataProvider.ketelModel.temperature >= this.currentStep.temperatuur) {
            this.stepTemperatureReached = true;
        }
    }
}
