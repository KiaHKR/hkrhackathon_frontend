export default class Puzzle {
    id!: string
    name!: string
    answer!: string


    constructor(id: string, name: string, answer: string) {
        this.id = id;
        this.name = name
        this.answer = answer

    }
}