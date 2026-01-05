const Form = ({addToBook, newName, handleChange, newNumber, handleNewNumber}) => {
    return (
    <div>
        <form onSubmit={addToBook}>
        <div>name: <input value={newName} onChange={handleChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div><button type="submit">add</button></div>
        </form>
    </div>
    )
}

export default Form