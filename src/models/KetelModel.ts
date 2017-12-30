import {Observable} from "rxjs";
export class KetelModel {

    private ketel: any;
    private ketelObserver: any;

    get pump(): boolean {
        return this._pump;
    }

    set pump(value: boolean) {
        this._pump = value;
    }
    get heater3(): boolean {
        return this._heater3;
    }

    set heater3(value: boolean) {
        this._heater3 = value;
    }
    get heater2(): boolean {
        return this._heater2;
    }

    set heater2(value: boolean) {
        this._heater2 = value;
    }
    get heater1(): boolean {
        return this._heater1;
    }

    set heater1(value: boolean) {
        this._heater1 = value;
    }

    get temperature(): number {
        return this._temperature;
    }

    set temperature(value: number) {
        this._temperature = value;
    }

    updates(): Observable<any> {
        return this.ketel;
    }

    updated() {
        this.ketelObserver.next(true);
    }

    private _temperature: number;
    private _heater1: boolean;
    private _heater2: boolean;
    private _heater3: boolean;
    private _pump: boolean;

    constructor(){
        this.temperature = 0.0;
        this.heater1 = false;
        this.heater2 = false;
        this.heater3 = false;
        this.pump = false;

        this.ketel = Observable.create(observer => {
            this.ketelObserver = observer;
        });
    }

}