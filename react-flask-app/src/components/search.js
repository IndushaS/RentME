import React, { Component } from 'react';
import './search.css'
import Listing from './listing.js'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      formFields: { address1: '', cityState1: '', address2: '', cityState2: '' },
      property1: [],
      property2: [],
      property1Submitted: false,
      property2Submitted: false,
      property1optimal: false,
      property2optimal: false,

    };
    this.onSubmit = this.onSubmit.bind(this);
    
  }
  onSubmit(e) {
    var optimal1;
    var optimal2;
    e.preventDefault();
    var formFields = this.state.formFields;
    var url1 = "/property/" + formFields.address1 + "/" + formFields.cityState1;
    var url2 = "/property/" + formFields.address2 + "/" + formFields.cityState2;
    fetch(url1).then(res => res.json()).then(data => {this.setState({ property1: data, property1Submitted: true }) }

    )
      .catch(function (error) {
        console.log(error);
        alert("Could not find property 1")
      });



    fetch(url2).then(res => res.json()).then(data2 => {this.setState({ property2: data2, property2Submitted: true }) }
    )
      .catch(function (error) {
        console.log(error);
        alert("Could not find property 2")
      });

      

  }

  inputChangeHandler(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  }

  render() {
    return (
      <div class="background">

        <div>
          <h2>Find your optimal location below!</h2>

          <form onSubmit={this.onSubmit}>
            <p></p>

            <div>

              <label>Address 1&emsp; </label>
              <input type="text" name="address1" placeholder="Ex. 123 Street" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.address1} />
          &emsp;   <label>City and State&emsp; </label>
              <input type="text" name="cityState1" placeholder="Ex. Denver, CO" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.cityState1} />
            </div>
            <div>
              <p></p>
              <p></p>

              <label>Address 2&emsp; </label>
              <input type="text" name="address2" placeholder="Ex.  123 Street" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.address2} />
          &emsp;  <label>City and State&emsp; </label>
              <input type="text" name="cityState2" placeholder="Ex. Denver, CO" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.cityState2} />
              <p></p>


              <div class="submitbutton">
                <p></p>

                <button class="contact100-form-btn" type="submit" value="Submit">Submit</button>



              </div>

            </div>

          </form>
         
          
          {}
          <p></p>
          <p></p>
          <p></p>

          <div className="listing">
           
            {this.state.property1Submitted && this.state.property2Submitted ? <Listing data={this.state.property1} data2={this.state.property2} /> : null}
            <div class="margin">
              {this.state.property1Submitted && this.state.property2Submitted ? <Listing data={this.state.property2} data2={this.state.property1} /> : null}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default Search;