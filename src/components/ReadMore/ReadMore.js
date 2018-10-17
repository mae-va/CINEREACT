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
            <div className="container mobile-readmore" style={style}>
                <div className="col-sm-12 bloc-txt"> {/* affichage mobile*/}
                    <div className="m-title mb-3">{this.props.title}</div>
                    <div className="">
                        <p>{this.props.year} - David Lynch</p> 
                    </div>
                    <div className="m-casting">
                        <em className="mb-3">Avec: Antoine Nourris, Tiphaine Deswartes, Maéva Duran, Matthieu Petit</em><br />
                        <div className="rating-mobile mt-3 mb-3">
                            <Rating value="3" readonly/>
                        </div>
                        
                    </div>
                    <div className="m-synopsis mt-3">
                        <p>{this.props.synopsis}</p>
                    </div>
                    
                </div>
                <div className="col-sm-12 icons-bottom mt-5">
                    <i className="fa fa-heart fa-2x" onClick={this.handleClick}></i>
                    <i class="fa fa-times fa-2x" onClick={this.closeReadMore}></i>
                </div>
            </div>
        )
    }

}



export default ReadMore;