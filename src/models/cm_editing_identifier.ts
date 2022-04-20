export default class CMEditingIdentifier {
    line!: number;
    ch!: number;
    counter!: string;
    passwordField!: boolean;

    constructor(line: number, ch: number, counter: string, passwordField: boolean) {
        this.line = line;
        this.ch = ch;
        this.counter = counter;
        this.passwordField = passwordField;
    }
}