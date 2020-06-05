import React, { Component } from 'react'
import "./Search.css"
import axios from 'axios'
export default class Search extends Component {
    
    constructor(props){
        super(props);

        this.state={
            query: '',
            results: {},
            loading:false,
            message: ' '
        }
    }

    fetchSearchResults = (query) => {
        const searchURL = `http://ctp-zip-api.herokuapp.com/zip/${query}`

        axios.get(searchURL,)
            .then ( res => {
                console.log(res.data);
                const msg = !res.data?'no results':'';
                this.setState({
                    results: res.data,
                    message: msg,
                    loading:false
                })
            })
            .catch( error => {
                if(error){
                    this.setState({
                    loading:false,
                    message:'failed to fetch data'
                    })
                }
            })
    }

    handleOnInputChange = (event) =>{
        const query = event.target.value;
        this.setState({
            query : query,
            loading : true,
            message : ' '
        }, () =>{ 
                    this.fetchSearchResults(query);
                })
    }

    renderSearchResults = () => {
        const results = this.state;
        if(results.results.length){
            return(
                <div className="results-container">
                    {results.results.map(result => {
                        return(
                            <a key={result.RecordNumber}>
                                <div id="individual-result">
                                <p>{result.City}</p>
                                <p>{result.State}</p>
                                <p>{result.Country}</p>
                                <p>({result.Lat},{result.Long})</p>
                                <p>POPULATION {result.EstimatedPopulation}</p>
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
                    <label className="search-label" htmlFor="search-input">
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
