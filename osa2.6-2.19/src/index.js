import React from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons';
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterWord: '',
      infoDialog: { text: '', error: "false"}
    }
  }

  componentDidMount() {
    personService.getAll()
      .then(response => {
        this.setState({ persons: response.data })
      });
  }

  handleChange = (e, property) => {
      const copy = this.state;
      copy[property] = e.target.value;
      this.setState({ ...copy });
  }

  handleSubmit = (e) => {
      e.preventDefault();

      //if name already exists, ask to replace number
      if(this.state.persons.map(p => p.name.toLowerCase()).indexOf(this.state.newName.toLowerCase()) > -1) {
        //wants to replace
        if(window.confirm("Korvataanko? :)")) {
          const toReplace = { ...this.state.persons.find(p => p.name === this.state.newName), 
                              number: this.state.newNumber }

          personService.replacePerson(toReplace)
            .then(resp => {
                  this.setState({persons: this.state.persons.map(p => p.id === toReplace.id ? resp.data : p),
                          newName: '', newNumber: '', infoDialog: {text: `Phonenumber of ${toReplace.name} replaced`}});
                })
            .catch(err => {this.setState({
              infoDialog: {text: "Already deleted from server", error: true},
              persons: this.state.persons.filter(p => p.id !== toReplace.id)
            })});
          return;
        }
        //does not want to replace -> just clear inputs
        else {
          this.setState({newName: '', newNumber: ''})
        }
      }
      //name does not exist -> add a new one
      else {
        personService.addPerson({name: this.state.newName, number: this.state.newNumber})
                     .then(resp => this.setState({
                       persons: this.state.persons.concat(resp.data),
                       infoDialog: {text: "Added a new entry", error: false}}));
      }


  }

  handleDelete = (id) => {
    if(window.confirm("really?"))
    {
      personService.deletePerson(id)
                    .then(() => {
                      this.setState({persons: this.state.persons.filter(p => p.id !== id),
                                    infoDialog: {text: "Delete successful", error: false}})
                    })
                    .catch(err => this.setState({
                      infoDialog: {text: "Already deleted from server", error: true},
                      persons: this.state.persons.filter(p => p.id !== id)
                    }));
    }
  }

  render() {
    return (
      <div>
        <Notification infoDialog={this.state.infoDialog} timeoutFn={() => this.setState({ infoDialog: {text: '', error: false }})} />
        <h2>Puhelinluettelo</h2>
        <Filter filterword={this.state.filterWord} changeFn={(e) => this.handleChange(e, 'filterWord')} />
        <h3> Lisää uusi </h3>
        <form>
          <div>
            nimi: <input onChange={(e) => this.handleChange(e, 'newName')} type="text" value={this.state.newName} />
          </div>
          <div>
              numero: <input onChange={(e) => this.handleChange(e, 'newNumber')} type="text" value={this.state.newNumber} />
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filterWord.toLowerCase()))
                           .map(p => <PersonInformation key={p.name} clickFn={() => this.handleDelete(p.id)} name={p.name} number={p.number} /> )}
      </div>
    )
  }
}

const PersonInformation = ({ name, number, clickFn}) => {
    return (
        <p> {name} {number} <button onClick={clickFn}>Poista</button></p>
    );
}

const Filter = ({filterword, changeFn}) => {
    return (   
        <div>
          <label>Etsi hakusanalla</label>
          <input type="text" onChange={changeFn} value={filterword} />
        </div>);

}

const Notification = ({ infoDialog, timeoutFn }) => {
  if (infoDialog.text === '') {
    return null
  }

  const message = infoDialog.text;

  setTimeout(timeoutFn, 5000);

  if (infoDialog.error) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="success">
      {message}
      </div>
    )
  }
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
)