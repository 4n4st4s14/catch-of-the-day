import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  constructor(){
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    //initialstate
    this.state = {
      fishes:{},
      order: {}
    };
  }

  componentWillMount(){
    //runs right before rendering
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    ,{
      context: this,
      state: 'fishes'
    });

    //check local storage for orders
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef){
      //update App order setState
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    // console.log('Something Changed');
    // console.log({nextProps, nextState});

    localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order));
  }

  addFish(fish){
    //update state
    const fishes = {...this.state.fishes};

    const timestamp = Date.now();

    fishes[`fish-${timestamp}`]= fish;
    //set state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  removeFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] =null;
    this.setState({fishes});
  };

  removeFromOrder= (key) => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  };

loadSamples(){
  this.setState({
    fishes: sampleFishes
  });
}

addToOrder(key){
  //copy state
  const order = {...this.state.order};
  //add new number of fish ordered
  order[key] = order[key] + 1 || 1;
  //update state
  this.setState({ order });

}

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
        fishes={this.state.fishes}
        order={this.state.order}
        params={this.props.params}
        removeFromOrder={this.removeFromOrder}/>
        <Inventory
        addFish={this.addFish}
        loadSamples= {this.loadSamples}
        fishes={this.state.fishes}
        updateFish={this.updateFish}
        removeFish={this.removeFish}
        storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}


export default App;
