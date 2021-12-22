import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import Filter from "./components/Filter";

const App = () => {
  const [notification, setNotification] = useState({
    message: null,
    messageType: null,
  });
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((personData) => {
      setPersons(personData);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const isNameUnique = !persons.some((person) => person.name === newName);

    const personObject = { name: `${newName}`, number: `${newNumber}` };
    if (isNameUnique) {
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNotification({
            message: `Added ${newName}`,
            messageType: "success",
          });
          setTimeout(() => {
            setNotification({
              message: null,
              messageType: null,
            });
          }, 4000);
        })
        .catch((error) => console.log(error));
    } else {
      const confirmReplacement = window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      );
      if (confirmReplacement) {
        const id = persons.find((person) => person.name === newName).id;
        personService
          .update(id, personObject)
          .then(() => {
            const newPersons = [...persons];
            const personIndex = persons.findIndex(
              (person) => person.name === newName
            );
            newPersons[personIndex].number = newNumber;
            setPersons(newPersons);
            setNotification({
              message: `Updated ${newName}`,
              messageType: "success",
            });
            setTimeout(() => {
              setNotification({
                message: null,
                messageType: null,
              });
            }, 4000);
          })
          .catch((err) => {
            setNotification({
              message: `Oops, ${newName} has already been deleted`,
              messageType: "error",
            });
            setTimeout(() => {
              setNotification({
                message: null,
                messageType: null,
              });
            }, 4000);
            setPersons(persons.filter((person) => person.name !== newName));
          });
      }
    }
  };

  const handleNewFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleDelete = (personName, personID) => {
    if (window.confirm(`Are you sure you want to delete ${personName}`)) {
      personService
        .remove(personID)
        .then(setPersons(persons.filter((person) => person.id !== personID)))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        messageType={notification.messageType}
      />
      <Filter handleNewFilter={handleNewFilter} />
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNewNumber={handleNewNumber}
        handleNewName={handleNewName}
      />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
