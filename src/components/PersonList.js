const PersonList = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(`${filter.toLowerCase()}`)
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.name, person.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PersonList;
