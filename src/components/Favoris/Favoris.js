  import React, {Component} from "react";
import './Favoris.css';
import Rating from "react-star-rating-lite";


class Favoris extends Component {
  constructor(props){
    super(props);
    this.state= {
      movies:[]
    }
    this.fullMovie = [];
    this.cardBlock = "";
    
  }


  componentDidMount() {
  
      let values = [];
      let keys = Object.keys(localStorage);
      let i = keys.length;
      for (let y = 0; y < i; y++) { 
      values.push(JSON.parse(localStorage.getItem(keys[y])));
      }
      values.map((value,index) =>{
        this.fullMovie.push(value);   
      })
      this.setState({ movies: this.fullMovie},()=>this.getCard());
      
    }

    setOverview = (param) =>{
      if (param.length > 90) {
        param= param.substring(0,90)+"...";
          return param;
      } 
    }


    getCard = () =>{
      
    
      this.cardBlock=
      this.state.movies.map((movie,index) =>{
       
        return(
      
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 col-12 p-0">           
          <div className="card mt-5 mx-5">
            <div className="row h-100 ">
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0 poster-like">
                
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="fav-image h-100 w-100"/>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
                <div className="card-block p-5" id="position">
                  <h4 className="card-title">{movie.title}</h4>
                  <p className="card-text"> {movie.release_date} {movie.director}</p>
                  <p className="card-text d-none d-sm-none d-md-block d-lg-block"> {}</p>
                  <div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
                    <p className="card-text">{this.setOverview(movie.overview)}</p>
                   
                  </div>
                  <div className="row heart_star">
                  <i className="fa fa-heart pt-1 pl-3 pr-5 coeur" onClick={()=>{window.localStorage.removeItem(`${movie.id}`)}}></i>
                  <Rating value={movie.vote_average} color="#f4dc42" weight="24" readonly/>
                  
                 </div>
                </div>
              </div>
            </div>
          </div>      
        </div>
      )})
        
   }

 


  

    render(){
      
        return (         
          <div className="row top">
          {this.cardBlock}      
          </div>               
        )
    }
}
export default Favoris;