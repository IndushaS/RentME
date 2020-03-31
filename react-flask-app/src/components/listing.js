import React from 'react'
import PropTypes from 'prop-types';
import './listing.css'


export class Listing extends React.Component {


    getStyle = () => {
        return {
           
            padding: '10px',
            

        }
    }

    render() {
        let address = this.props.data.property[0].address
        let location = this.props.data.property[0].location
        let price = this.props.data.property[0].sale.saleAmountData
        let summary = this.props.data.property[0].summary
        // let rooms=this.props.data.building.rooms
        let monthlyStats = this.props.data.monthlyStats



        return (
            <div style={{ backgroundColor: this.props.data.monthlyStats.monthlyRevenue==this.props.data2.monthlyStats.monthlyRevenue? "#C6F6C6" : "white", backgroundColor: this.props.data.monthlyStats.monthlyRevenue>this.props.data2.monthlyStats.monthlyRevenue? "#C6F6C6" : "white"}}>

                <div> <table>
                    <tr>Address:
                  <td>   {address ? <p>{address.oneLine}</p> : null}</td>
                    </tr>
                    <tr>
                        Market Price:
                  <td>      {price ? <p>${price.saleAmt}</p> : null}</td>
                    </tr>

                    <tr>Location:
                  <td>     {location ? <p>Longitude: {location.longitude} Latitude: {location.latitude}</p> : null}</td>
                    </tr>

                    <tr>Summary:
                  <td>     {summary ? <p>Type: {summary.propClass}</p> : null}</td>
                    </tr>

                    <tr>Monthly Payment:
                    <td>    {monthlyStats ? <p>${Math.round(monthlyStats.monthlyPayments)}</p> : null}</td>
                    </tr>
                    <tr>Monthly Profit:
                    <td>    {monthlyStats ? <p>${Math.round(monthlyStats.monthlyProfit)}</p> : null}</td>
                    </tr>
                    <tr>Monthly Revenue:
                  <td>    {monthlyStats ? <p>${Math.round(monthlyStats.monthlyRevenue)} </p> : null}</td>
                    </tr>
                    <tr> Yearly Profit:
                    <td>    {monthlyStats ? <p>${Math.round(monthlyStats.yearlyProfit)} </p> : null}</td>
                    </tr>
                    <tr> Yearly Revenue:
                    <td>    {monthlyStats ? <p>${Math.round(monthlyStats.yearlyRevenue)} </p> : null}</td>
                    </tr>
                </table>
                </div>
            </div>

        )
    }
}
Listing.propTypes = {
    data: PropTypes.object.isRequired
}

export default Listing;