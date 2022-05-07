export default class Puzzle {
    constructor(
        private _id: string,
        private _title: string,
        private _story: string,
        private _examples: { inputExample: string, logicExample: string }
    ) { }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get story(): string {
        return this._story;
    }

    set story(value: string) {
        this._story = value;
    }


    get examples(): { inputExample: string, logicExample: string } {
        return this._examples;
    }

    set examples(value: { inputExample: string, logicExample: string }) {
        this._examples = value;
    }
}