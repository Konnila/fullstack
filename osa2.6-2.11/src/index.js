import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', phonenr: '040 112' }
      ],
      newName: '',
      newNumber: '',
      filterWord: ''
    }
  }

  handleChange = (e, property) => {
      const copy = this.state;
      copy[property] = e.target.value;
      this.setState({ ...copy });
  }

  handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.persons.map(p => p.name).indexOf(this.state.newName) > -1) {
        this.setState({newName: '', newNumber: ''});
        return;
      }

      const newEntry = { name: this.state.newName, phonenr: this.state.newNumber };
      this.setState({persons: this.state.persons.concat([newEntry]),
                     newName: '', newNumber: ''});
  }

  render() {
    return (
      <div>
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
        {this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filterWord.toLowerCase())).map(p => <PersonInformation key={p.name} name={p.name} number={p.phonenr} /> )}
      </div>
    )
  }
}

const PersonInformation = ({ name, number}) => {
    return (
        <p> {name} {number}</p>
    );
}

const Filter = ({filterword, changeFn}) => {
    return (   
        <div>
            <label>Etsi hakusanalla</label>
        <input type="text" onChange={changeFn} value={filterword} />
        </div>);

}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
)