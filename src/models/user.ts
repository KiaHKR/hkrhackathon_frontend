
export class User {
    name!: string;
    email!: string;
    year!: number;
    isAdmin!: boolean;
    currentPuzzleId!: string;
    constructor(name: string, email: string, year: number, isAdmin: boolean, currentPuzzleId: string) {
        this.name = name
        this.email = email
        this.year = year
        this.isAdmin = isAdmin
        this.currentPuzzleId = currentPuzzleId
    }
}