class TraderProfile {
    readonly name: string
    readonly tradeCount: number
    readonly score: number

    constructor(name: string, tradeCount: number, score: number) {
        if (!name) throw new Error("Name is required and cannot be empty")

        this.name = name
        this.tradeCount = tradeCount
        this.score = score
    }
}

export default TraderProfile