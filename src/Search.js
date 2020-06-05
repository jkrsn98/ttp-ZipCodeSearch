import React, { Component } from 'react'
import axios from 'axios'
export default class Search extends Component {
    
    constructor(props){
        super(props);

        this.state={
            query: '',
            results: {},
            loading:false,
        }
    }

    fetchSearchResults = (query) => {
        const searchURL = `http://ctp-zip-api.herokuapp.com/zip/${query}`

        axios.get(searchURL,)
            .then ( res => {
                console.log(res.data);
                this.setState({
                    results: res.data,
                    loading:false
                })
            })
            .catch( error => {
                if(error){
                    this.setState({
                    loading:false,
                    })
                }
            })
    }

    handleOnInputChange = (event) =>{
        const query = event.target.value;
        this.setState({
            query : query,
            loading : true,
        }, () =>{ 
                    this.fetchSearchResults(query);
                })
    }

    renderSearchResults = () => {
        const results = this.state;
        if(results.results.length){
            return(
                <div className="results">
                    {results.results.map(result => {
                        return(
                            <a key={result.RecordNumber}>
                                <div id="individual-result">
                                <p>{result.City}</p>
                                <p>{result.State}</p>
                                <p>{result.Country}</p>
                                </div>
                            </a>
                        )
                    })}
                </div>
            )
        }
    };

    render() {
        const query = this.state.query;
        //console.warn(this.state)
        return (
            <div>
               <form id="form">
                    <label className="search">
                       <p id="prompt">enter a zip code:</p>
                        <input 
                            id="search-input" 
                            type="number" 
                            //name="zip" 
                            pattern="[0-9]*"
                            maxLength="5"
                            value ={query}
                            placeholder="zip code"
                            onChange={this.handleOnInputChange}
                        />
                    </label>
                   {/*
                    <div id="div3">
                    <button id="searchbutton">search</button>
                    </div>
                   */}
               </form>
                {this.renderSearchResults()}
            </div>
        )
    }
}
