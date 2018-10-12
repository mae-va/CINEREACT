import React, {Component} from "react";
import './Favoris.css';
import Rating from "react-star-rating-lite";


class Favoris extends Component {
  constructor(props){
    super(props);
    this.state= {
      movies:[]
    }
  }
  
  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.getRandomInt(5)}&primary_release_year=${new Date().getFullYear()}`)
      .then(response => response.json())        
      .then(json => {this.setState({movies : json.results[this.getRandomInt(20)]})})
      .then(() => {this.getDirectorFromMovieId()})
      .then(() => {
        this.state.movies.release_date = this.state.movies.release_date.slice(0,4);
      })
   
  }
  
  getDirectorFromMovieId = () => {
    fetch(`https://api.themoviedb.org/3/movie/${this.state.movies.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
      .then(response => response.json())
      .then(json =>{
        this.state.movies.director = json.crew[0].name;
        let results = json.cast.slice(0,4);
        let fullCast ="";
        for(let i=0; i<results.length ; i++){
            fullCast +=`${results[i].name}, `;
        }
        this.state.movies.casting = fullCast;
        this.forceUpdate(); 
      })
    
  } 
  
  
  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
    render(){
        return (
       
          
        <div className="container">
           <div className= "row">
          
            <div className="blog-card">
             <div className="photo-block"><img className="img-fluid" width="100%" alt="Kill Bill" src={`https://image.tmdb.org/t/p/original${this.state.movies.poster_path}`}></img></div>
               <div className="Titre">
                     <h3>{this.state.movies.title}</h3>
               </div>
                 
                  <ul>
                   <li className="details">{this.state.movies.release_date}</li> 
                   <li className="details"> {this.state.movies.director} </li> 
                 </ul>    

             <div className="rate" >
                <Rating className="stars" value="3" weight="12"  readonly/>
             </div>                 
             <div className= "heart">
                <i className="fa fa-heart"></i>
            </div>   
          </div> 
            <div className="blog-card">
              <div className="photo-block"><img className="img-fluid" width="100%" alt="Star Wars" src={`https://image.tmdb.org/t/p/original${this.state.movies.poster_path}`}></img></div>
              
              <div className="Titre">
                <h3>{this.state.movies.title}</h3>   
              </div>  

              <ul>
                <li className="details">{this.state.movies.release_date}</li> 
                <li className="details"> {this.state.movies.director} </li> 
              </ul>
             <div className="rate">
                <Rating className="stars" value="3"  readonly/>
             </div>       
            <div className= "heart">
               <i className="fa fa-heart"></i>
           </div>
        </div>   
      </div>            
  </div>     
     
        )
    }
}
export default Favoris;