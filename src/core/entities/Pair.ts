class Pair {
    readonly baseCode: string
    readonly variableCode: string
    readonly symbol: string

    constructor(baseCode: string, variableCode: string) {
        if (!baseCode) throw new Error("Base code asset is required and cannot be empty")
        if (!variableCode) throw new Error("Variable code asset is required and cannot be empty")

        this.baseCode = baseCode.toUpperCase()
        this.variableCode = variableCode.toUpperCase()
        this.symbol = `${this.baseCode}/${this.variableCode}`
    }
}

export default Pair