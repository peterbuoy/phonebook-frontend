const PersonForm = ({ handleAddPerson, handleNewName, handleNewNumber }) => {
  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input onChange={handleNewName} />
        </div>
        <div>
          number: <input onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
