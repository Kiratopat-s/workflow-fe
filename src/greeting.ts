interface GreetingProps {
    name: string
    age: number
    format: string
}

function greeting(person: GreetingProps) {
    if (person.format === "Table") {
        console.table(person)
    } else {
        console.log(`Hello, ${person.name}! You are ${person.age} years old.`)
    }
}

greeting({
    name: "Alice",
    age: 18,
    format: "Table"
})