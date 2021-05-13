import React from 'react';
import '../CSS/App.css'

function CountryPicker(props) {
    return (
        <div>
            <select className="dropDown" onChange={(e) => props.handleCountryChange(e.target.value)}>
                <option defaultValue="global" >Global</option>
                {props.countries.map(country => (
                    <option key={country} >{country}</option>
                )
                )}
            </select>
        </div>
    );

}
export default CountryPicker;