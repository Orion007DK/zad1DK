import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
    show: false,
  };

constructor(props){
super(props);
this.showHistory=this.showHistory.bind(this);
}

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });    
    
   
    this.setState({ seenIndexes: this.state.seenIndexes.concat(this.state.index)});
    this.setState({ index: '' });
    this.fetchIndexes();
    this.fetchValues();

  };

  renderSeenIndexes() {
  	if(this.state.show){
    return this.state.seenIndexes.reverse().slice(0,10).reverse().map(({ number }) => number).join(', ');
    	} else {
    return null;}
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }
  
  showHistory(){
  this.setState({
  	show: !this.state.show
  });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
	<button onClick={this.showHistory}>
        	Historia
        </button>
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        
        <h3>Calculated Values:</h3>
        {this.renderValues()}

        
        
      </div>
    );
  }
}

export default Fib;
