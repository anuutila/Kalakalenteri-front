import React from 'react';
import entryService from './services/entries'
import InputForm from './components/InputForm';
import EntryList from './components/EntryList';
import Statistics from './components/Statistics';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      newFish: '',
      newDate: '',
      newLength: '',
      newWeight: '',
      newLure: '',
      newPlace: '',
      newTime: '',
      newPerson: '',
      isHidden: true
    }
    console.log('constructor')
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount() {
    console.log('did mount')
    entryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ entries: response })
      })
      .catch(error => {
        console.log('fail')
      })
  }

  addEntry = (event) => {
    event.preventDefault()

    if (!this.state.newFish || !this.state.newDate || !this.state.newPerson) {
      return window.alert('kalalaji, päivämäärä tai saajan nimi puuttuu')
    }

    const entryObject = {
      fish: this.state.newFish,
      date: this.state.newDate,
      length: this.state.newLength,
      weight: this.state.newWeight,
      lure: this.state.newLure,
      place: this.state.newPlace,
      time: this.state.newTime,
      person: this.state.newPerson
    }

    entryService
      .create(entryObject)
      .then(response => {
        console.log(response)
        console.log('entry added')
        this.setState({
          entries: this.state.entries.concat(response),
          newFish: '',
          newDate: '',
          newLength: '',
          newWeight: '',
          newLure: '',
          newPlace: '',
          newTime: '',
          newPerson: ''
        })
      })
    .catch(error => {
      console.log('fail')
    })
  }

  editEntry = (id) => {
    //event.preventDefault()
    console.log('editEntry')
    console.log(id)
  }  

  removeEntry = (id) => {
    return () => {
      const entry = this.state.entries.find(e => e.id === id)
      
      if (window.confirm(`Poistetaanko ${entry.fish}, jonka ${entry.person} nappasi ${entry.date}?`)) {
        entryService
          .remove(id)
          .then(response => {
            console.log('entry removed')
            this.setState({ 
              entries: this.state.entries.filter(e => e.id !== id) 
            })
          })
          .catch(error => {
            console.log(error)
            alert("Poisto epäonnistui.")
          })
      }

    }
  }

  handleFishChange = (event) => {
    this.setState({ newFish: event.target.value })
  }

  handleDateChange = (event) => {
    this.setState({ newDate: event.target.value })
  }

  handleLengthChange = (event) => {
    this.setState({ newLength: event.target.value })
  }

  handleWeightChange = (event) => {
    this.setState({ newWeight: event.target.value })
  }

  handleLureChange = (event) => {
    this.setState({ newLure: event.target.value })
  }

  handlePlaceChange = (event) => {
    this.setState({ newPlace: event.target.value })
  }

  handleTimeChange = (event) => {
    this.setState({ newTime: event.target.value })
  }

  handlePersonChange = (event) => {
    this.setState({ newPerson: event.target.value })
  }

  render() {
    console.log('render')
    return (
      <div className='rootDiv1'>
        
        <div className='topShade'> </div>
        <h1 className='title' id='title1'>KALAKALENTERI</h1>
        <div className='newEntryContainer'>
          <h2>UUSI SAALIS</h2>
          <div className='formContainer'>
            <InputForm
              state={this.state}
              onSubmit={this.addEntry}
              buttonText={'lisää saalis'}
              handleFishChange={this.handleFishChange}
              handleDateChange={this.handleDateChange}
              handleLengthChange={this.handleLengthChange}
              handleWeightChange={this.handleWeightChange}
              handleLureChange={this.handleLureChange}
              handlePlaceChange={this.handlePlaceChange}
              handleTimeChange={this.handleTimeChange}
              handlePersonChange={this.handlePersonChange}
            />
          </div>
        </div>
        <div className='tableContainer'>
          <div>
            {!this.state.isHidden && <Statistics entries={this.state.entries} />}
            <button className='button' id='showButton' onClick={this.toggleHidden.bind(this)}>
              näytä/piilota statistiikat
            </button>
          </div>
          <EntryList
            entries={this.state.entries}
            removeEntry={this.removeEntry}
            state={this.state}
            onSubmit={this.editEntry}
            handleFishChange={this.handleFishChange}
            handleDateChange={this.handleDateChange}
            handleLengthChange={this.handleLengthChange}
            handleWeightChange={this.handleWeightChange}
            handleLureChange={this.handleLureChange}
            handlePlaceChange={this.handlePlaceChange}
            handleTimeChange={this.handleTimeChange}
            handlePersonChange={this.handlePersonChange}
          />
        </div>
        
      </div>
    )
  }
}

export default App
