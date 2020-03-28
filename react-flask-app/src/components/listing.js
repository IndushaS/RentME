import React from 'react'
import PropTypes from 'prop-types';
import './listing.css'


export class Listing extends React.Component{

    
    getStyle=()=>{
       return{ 
          background: '#f4f4f4',
          padding:'10px',
          borderColor: this.props.optimal?
          'border-color':'green',
          
        }
    }   
    
    render(){
        let address=this.props.data.address
        let location=this.props.data.location
        let price=this.props.data.sale.saleAmountData
        let summary=this.props.data.summary
        let rooms=this.props.data.building.rooms
        
        
       
        return(
            <div>
            
                <div>
                    
                    {address?<p>Address:{address.oneLine}</p>:null}
                    {price?<p>Market Price:{price.saleAmt}</p>:null}
                    {location?<p>Longitude:{location.longitude} Latitude:{location.latitude}</p>:null}
                    {summary?<p>Type:{summary.propClass}</p>:null}
                    {rooms?<p>Bedrooms:{rooms.beds} Bathrooms:{rooms.bathsTotal}</p>:null}
                
                </div>
            </div>  
           
        )
    }
}
Listing.propTypes={
    data:PropTypes.object.isRequired
}

export default Listing;