interface GreetingProps {
    name: string
    age: number
    format: string
}

function greeting(props: GreetingProps) {
    if (props.format === "Table") {
        console.table({
            name: props.name,
            age: props.age
        })
    } else {
        console.log(`Hi, ${props.name}`)
    }
}

greeting({
    name: "Alice",
    age: 18,
    format: "Table"
})

greeting({
    name: "Alice",
    age: 18,
    format: "default"
})