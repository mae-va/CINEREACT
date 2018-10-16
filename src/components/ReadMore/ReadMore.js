import React, { Component } from 'react';
import Rating from "react-star-rating-lite";
import "./ReadMore.css";


class ReadMore extends Component {
    constructor(props){
        super(props);
        this.state={
            readMore: false
        }
    }


    closeReadMore = () => {
        this.setState({readMore: !this.state.readMore});
    }

    render (){
        const style = this.state.readMore ? {display: 'none'} : {};
        return (
            <div className="container mobile-readmore mt-5" style={style}>
                <div className="col-sm-12 bloc-txt ml-3 mr-4"> {/* affichage mobile*/}
                    <div className="row-m m-title mb-3 mt-3">{this.props.title}</div>
                    <div className="row">
                        <p>{this.props.year} - David Lynch</p> 
                    </div>
                    <div className="row m-casting">
                        <em>Avec: Antoine Nourris, Tiphaine Deswartes, Maéva Duran, Matthieu Petit</em>
                        <Rating className="rating-mobile mt-5 pt-5 mb-3" value="3" readonly/>
                    </div>
                    <div className="row m-synopsis mt-3">
                        <p>{this.props.synopsis}</p>
                    </div>
                    <div className="row">
                        <i className="fa fa-heart fa-2x mr-5 ml-2" onClick={this.handleClick}></i>
                        <i class="fa fa-times fa-2x" onClick={this.closeReadMore}></i>
                    </div>
                </div>
            </div>
        )
    }

}



export default ReadMore;