interface GreetingProps {
    name: string
    age: number
    format: string
}

function greeting(props: GreetingProps) {
    if (props.format === "Table") {
        console.table(props)
    } else {
        console.log(`Hello, ${props.name}! You are ${props.age} years old.`)
    }
}

greeting({
    name: "Alice",
    age: 18,
    format: "Table"
})