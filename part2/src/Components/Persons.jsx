const Persons = ({filteredEntries, removeFromBook}) => {

    return (
        <div>
        {filteredEntries.map(e => (   
        <div key = {e.id}> 
            <p>{e.name} {e.number}</p>
            <button onClick={() => removeFromBook(e.name, e.id)}>remove</button>
        </div>
    ))}
        </div>
    )
}

export default Persons