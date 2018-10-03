import React, {Component} from "react";
import './Favoris.css';

class Favoris extends Component {
    render(){
        return(
            <div>
                <div class="container">
                    <div class="row">
                        <div class= "card-body">
                            <div class="col-md-6">
                                <div>
                                    <div class="row align-items-center">
                                        <div class="col-xs-6 col-md-6"><img width="100%" alt="star wars" src="http://fr.web.img5.acsta.net/r_1280_720/medias/nmedia/18/35/41/59/18867130.jpg"/></div>
                                        <div class="col-xs-6 col-md-6">
                                            <div>
                                                <h3>STAR WARS 4</h3> 
                                            </div>  
                                                <ul>
                                                        <li>1977</li> 
                                                        <li>121 min</li> 
                                                        <li>Sci Fi</li>
                                                </ul>     
                        
                                                <div>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                </div> 
                                    
                                                <div class= "heart">
                                                    <i class="fas fa-heart"></i>
                                                </div>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class= "card-body">
                            <div class="col-md-6">
                                <div>
                                    <div class="row align-items-center">
                                        <div class="col-xs-6 col-md-6"><img width="100%" alt="kill bill" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/343086/h8fnwL1.png"/></div>
                                        <div class="col-xs-6 col-md-6">
                                       
            
                                       <div>
                                           <h3>KILL  BILL:  VOL.  1</h3> 
                                        </div>   
                                        <ul>
                                            <li>2003</li> 
                                            <li>111 min</li> 
                                            <li>Action</li>
                                         </ul>    
                                        <div>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                        </div> 
                              
                                        <div class= "heart">
                                              <i class="fas fa-heart"></i>
                                       </div>   
                                   </div>
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