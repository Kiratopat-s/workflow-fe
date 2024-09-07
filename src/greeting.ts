interface GreetingProps {
    name: string
    age: number
    format?: "Table" | "Default"
}

function greeting(props: GreetingProps) {
    const { name, age } = props
    const format = props.format || "Default"
    if (format === "Table") {
        console.table({ name, age })
    } else if (format === "Default") {
        console.log(`Hello, ${name}`)
    } else {
        throw new Error("Invalid format")
    }
}

greeting({ name: "Alice", age: 18, format: "Table" })
greeting({ name: "Bob", age: 18, format: "Default" })
greeting({ name: "Charlie", age: 18 }) // Hi, Charlie
greeting({ name: "Charlie", age: 18, format: "abc" }) // typescript error