import React from 'react';
import { getFunName } from '../helpers';



class StorePicker extends React.Component {

    goToStore(e){
      e.preventDefault();
      console.log('submit');
        //grab text from box for store Name
        const storeId = (this.storeInput.value);
        //transition to /store/storId
        this.context.router.transitionTo(`/store/${storeId}`);
    }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      <h2> Please Enter a Store</h2>
      <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input)=> {this.storeInput = input}} />
      <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
