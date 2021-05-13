import React, { Component } from 'react';
import './CSS/App.css'
import dateFormat from 'dateformat';
import CountryPicker from './Components/CountryPicker';
import Charts from './Components/ShowChart';
import CountUp from 'react-countup';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infected: ' ',
      recovered: '',
      death: '',
      date: '',
      countries: [],
      selectedCountry: 'Global'
    }
  }

  async componentDidMount() {

    const response = await fetch('https://covid19.mathdro.id/api');
    const data = await response.json();
    let tempArray = [];
    this.setState({
      infected: data.confirmed.value,
      recovered: data.recovered.value,
      death: data.deaths.value,
      date: data.lastUpdate
    });
    const responses = await fetch('https://covid19.mathdro.id/api/countries');
    const datas = await responses.json();
    for (var i = 0; i < datas.countries.length; i++) {
      tempArray.push(datas.countries[i].name);
    }
    this.setState({ countries: tempArray });
  }

  handleCountryChange = async (country) => {
    if (country !== "Global") {
      const response = await fetch(`https://covid19.mathdro.id/api/countries/${country}`);
      const data = await response.json();
      this.setState({
        selectedCountry: country,
        infected: data.confirmed.value,
        death: data.deaths.value,
        recovered: data.recovered.value
      })
    }
    else {
      this.setState({
        selectedCountry: country
      })
    }
  }


  render() {
    return (
      <div className="App">
       <meta name="viewport" content="width=device-width, initial-scale=1"/>
        
        <div className="tracker">
        <h1>COVID-19 TRACKER</h1>
        <ul>
          <li className="infected"><span className="description">Infected</span> <CountUp className="count" start={0} end={Number(this.state.infected)} duration={1} />
            <span className="date">{dateFormat(this.state.date, "ddd mmmm dS yyyy")}</span>
            Number of active case of <br />Covid-19</li>
          <li className="recovered"><span className="description">Recovered</span> <CountUp className="count" start={0} end={Number(this.state.recovered)} duration={1} />
          <span className="date">{dateFormat(this.state.date, "ddd mmmm dS yyyy")}</span>
           Number of recoveries from <br />Covid-19</li>
          <li className="death"><span className="description">Death</span> <CountUp className="count" start={0} end={Number(this.state.death)} duration={1} />
          <span className="date">{dateFormat(this.state.date, "ddd mmmm dS yyyy")}</span>
          Number of deaths caused by <br />Covid-19</li>
        </ul>
        <CountryPicker countries={this.state.countries} handleCountryChange={this.handleCountryChange} />
        <Charts key={this.state.selectedCountry} country={this.state.selectedCountry} infected={this.state.infected} death={this.state.death} recovered={this.state.recovered} />
        </div>
      </div>
    );
  }
}

export default App;
