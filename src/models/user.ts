import { UserPuzzle } from "./user_puzzle";

export class User {
    private _currentTask!: string;
    private _isAdmin!: boolean;
    private _userPuzzles!: {
        [puzzleId: string]: UserPuzzle
    };

    constructor(
        private _name: string,
        private _email: string,
        private _year: number,
    ) { }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }

    get currentTask(): string {
        return this._currentTask;
    }

    set currentTask(value: string) {
        this._currentTask = value;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

    set isAdmin(value: boolean) {
        this._isAdmin = value;
    }

    addPuzzle(puzzle: UserPuzzle) {
        this._userPuzzles[puzzle.id] = puzzle;
    }

    getPuzzle(id: string) {
        return this._userPuzzles[id];
    }
}