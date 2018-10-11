import './Search.css';
import React, {Component} from 'react'


class Search extends Component {

    constructor(){
        super();
        this.state = {
            select: 0,
            Input: ""
        }
    }
    
    fetch = () => {
        // a remplir par Antoine
    }

    inputChange = () => {
        this.setState({Input: this.state.Input})             //met à jour le state.Input
    }

    selectChange = () => {
        this.setState({select : this.state.select})             //met à jour le state.select
    }


    render(){
        return(
            <div className= "searchBox">
                
                <form id="demo-2">
                    <button onClick ={this.onClick} className="btn btn-link search mr-3" type="button"  >
                    </button>
                    <input type="search" placeholder="Rechercher"> 
                    </input>
                    <button>Ok</button>
                    <select id="monselect">
                        <option onChange ={this.selectChange} value="Film" selected>Film</option> 
                        <option onChange ={this.selectChange} value="Réalisateur">Réalisateur</option>
                        <option onChange ={this.selectChange} value="Année">Année</option>
                    </select>
                   
                </form>
                
                
            </div>
        )

    }
}



export default Search;