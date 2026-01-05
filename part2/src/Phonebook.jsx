import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Form from './Components/Form'
import Persons from './Components/Persons'
import personServices from './Services/Persons'
import './index.css'

const App = () => {
  // useState for constant updates to the website front-end
  const [entry, setEntry] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  // get the url for the server
  const baseUrl = 'http://localhost:3001/persons'

  // load the data from the server
  useEffect(() => {
    personServices.getAll().then(response => {
      setEntry(response)
    })
  }, [])

  // add an entry to the phonebook through the server
  const addToBook = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }

    const duplicate = entry.find(e => e.name === newName)
    if(duplicate) {
      if (!window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        setNewName('')
        setNewNumber('')
        return
      }
      else {
        const updatedPerson = {... duplicate, number: newNumber}
        personServices.update(duplicate.id, updatedPerson).then(returned => {
          setEntry(entry.map(p => p.id !== duplicate.id ? p : returned))
          setNewName('')
          setNewNumber('')
        })
        return}
    }

    personServices.create(personObject).then(
      response => {
        setEntry(entry.concat(response))
        setNewName('')
        setNewNumber('')
      }
    )
  }

  const removeFromBook = (name, id) => {
    if (!window.confirm('Delete ' + name + '?')) return
    personServices.remove(id).then(() => {
      setEntry(entry.filter(p => p.id !== id))
      }
    )
  }

  const handleChange = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilterValue(event.target.value)

  const filteredEntries = entry.filter(person =>
    person.name.toLowerCase().startsWith(filterValue.toLowerCase())
  )

  return (
    <div>
      <h2>The Phonebook</h2>

      <Filter
        filterValue={filterValue}
        handleFilter={handleFilter}
      />

      <h2>add a new</h2>

      <Form
        addToBook={addToBook}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>

      <Persons filteredEntries={filteredEntries} removeFromBook={removeFromBook} />
    </div>
  )}

export default App