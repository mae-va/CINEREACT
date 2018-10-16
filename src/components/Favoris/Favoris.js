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

    render(){
        return (         
          <div className="row top">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 col-12 p-0">           
              <div className="card mt-5 mx-5">
                <div className="row h-100 ">
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0 poster-like">
                    <i className="fa fa-heart icon"></i>
                    <img src={`https://image.tmdb.org/t/p/original${this.state.movies.poster_path}`} alt={this.state.movies.title} className="fav-image h-100 w-100"/>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
                    <div className="card-block p-5" id="position">
                      <h4 className="card-title">{this.state.movies.title}</h4>
                      <p className="card-text"> {this.state.movies.release_date} {this.state.movies.director}</p>
                      <p className="card-text d-none d-sm-none d-md-block d-lg-block"> {this.state.movies.casting}</p>
                      <div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
                        <p className="card-text">{this.state.movies.overview}</p>
                        <p className="read-more"><a href="#" className="button">Read More</a></p>
                      </div>
                      <div className="item-bottom">
                        <Rating className="stars" value="3" weight="18"  readonly/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>      
            </div>  
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 col-12 p-0">
            <div className="card mt-5 mx-5">
                <div className="row h-100">
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
                    <img src={`https://image.tmdb.org/t/p/original${this.state.movies.poster_path}`} alt={this.state.movies.title} className=" fav-image h-100 w-100"/>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
                    <div className="card-block p-5" id="position">
                      <h4 className="card-title">{this.state.movies.title}</h4>
                      <p className="card-text">{this.state.movies.release_date} {this.state.movies.director}</p>
                      <p className="card-text">{this.state.movies.casting}</p>
                      <div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
                        <p className="card-text">{this.state.movies.overview}</p>
                        <p className="read-more"><a href="#" className="button">Read More</a></p>
                      </div>
                      <div className="item-bottom">
                        <Rating className="stars" value="3" weight="18"  readonly/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>      
            </div>       
          </div>               
        )
    }
}
export default Favoris;