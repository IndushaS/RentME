import React, { Component } from 'react';
import './search.css'
import Listing from './listing.js'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {address1:'', cityState1:'',address2:'', cityState2:''},
      property1:[],
      property2:[],
      property1Submitted:false,
      property2Submitted:false,
      property1optimal:false,
      property2optimal:false,

    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) { 
    e.preventDefault();
    var formFields=this.state.formFields;
    var url1="/property/"+formFields.address1+"/"+formFields.cityState1;
    var url2="/property/"+formFields.address2+"/"+formFields.cityState2;
    fetch(url1).then(res => res.json()).then(data => {this.setState({property1:data.property[0], property1Submitted:true})}
    
    )
    .catch(function(error){
        console.log(error);
        alert("Could not find property 1")
    });

    

    fetch(url2).then(res => res.json()).then(data2 => {this.setState({property2:data2.property[0], property2Submitted:true})}
    )
    .catch(function(error){
        console.log(error);
        alert("Could not find property 2")
    });
    
   }

   inputChangeHandler(e) {
    let formFields = {...this.state.formFields};
    formFields[e.target.name] = e.target.value;
    this.setState({
     formFields
    });
   }

  render() {
    return (
      <div>
        <h2>Search</h2>
        
        <form onSubmit={this.onSubmit}>
        <div>
          <label>Address 1:</label>
          <input type="text" name="address1" placeholder="4529 Winona Court" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.address1} /> 
          <label>City and State:</label>
          <input type="text" name="cityState1" placeholder="Denver, CO" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.cityState1}/>
        </div> 
        <div>
          <label>Address 2:</label>
          <input type="text" name="address2" placeholder="4529 Winona Court" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.address2} />
          <label>City and State:</label>
          <input type="text" name="cityState2" placeholder="Denver, CO" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.cityState2}/> 
          <div>
          <input type="submit" value="submit"></input>
        </div>
          </div>
          
        </form>
        {}
        <div className="listing">
            
            {this.state.property1Submitted && this.state.property2Submitted? <Listing data={this.state.property1}/>:null}
            {this.state.property1Submitted && this.state.property2Submitted? <Listing data={this.state.property2}/>:null}
            
        </div>
      </div>
    );
  }
}

export default Search;