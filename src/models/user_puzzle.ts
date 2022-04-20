export class UserPuzzle {
    constructor(
        private _id: string,
        private _userInput: string,
        private _answer: string,
        private _completionTime: string,
        private _numberOfWrongSubmissions: number,
    ) { }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get userInput(): string {
        return this._userInput;
    }

    set userInput(value: string) {
        this._userInput = value;
    }

    get answer(): string {
        return this._answer;
    }

    set answer(value: string) {
        this._answer = value;
    }

    get completionTime(): string {
        return this._completionTime;
    }

    set completionTime(value: string) {
        this._completionTime = value;
    }

    get numberOfWrongSubmissions(): number {
        return this._numberOfWrongSubmissions;
    }

    set numberOfWrongSubmissions(value: number) {
        this._numberOfWrongSubmissions = value;
    }
}