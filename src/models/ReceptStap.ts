/**
 * Created by dennis on 2-1-18.
 */
export class ReceptStap {
    get tijd(): number {
        return this._tijd;
    }

    get temperatuur(): number {
        return this._temperatuur;
    }

    constructor(private _temperatuur: number, private _tijd: number) {

    }
}