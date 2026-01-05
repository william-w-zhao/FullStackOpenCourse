const Course = ({course}) => {
    const title = course.name
    const name = course.parts.map(part => 
        <li key={part.id}>
            {part.name}
        </li>
    )
    const total = course.parts.reduce((accumulator, part) => 
        accumulator + part.exercises, 0
    )
    return (
        <div>
            <h1>{title}</h1>
            <ul>{name}</ul>
            <p>Total Exercises: {total}</p>
        </div>
    )
}

export default Course
