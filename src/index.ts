class Parser {
    public tokens = ["a", "b", "c"];

}

let p = new Parser()
console.log(p.tokens.map((t: string) => t+"d"))