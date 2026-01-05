const Filter = ({filterValue, handleFilter}) => {
    return (
        <div>
        <form>
        <div>filter shown with: <input value = {filterValue} onChange={handleFilter}/></div>
        </form>
        </div>
    )
}

export default Filter