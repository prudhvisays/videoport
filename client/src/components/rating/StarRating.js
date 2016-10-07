import React from "react";
import Star from "./Star";

class StarRating extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      rating:3,
      hoverAt: null
    }
  }

  // handleMouseOver(index,event){
  //   this.state.hoverAt = index + 1;
  //   this.forceUpdate();
  // }
  // handleMouseOut(index,event){
  //   this.state.hoverAt = null;
  //   this.forceUpdate();
  // }
  // handleClick(index,event){
  //   this.state.rating = index + 1;
  //   this.forceUpdate();
  //   console.log("clicked");
  // }
  render(){
    const stars = [];
    for(let i=0;i<5;i++){
      const rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
      const selected = (i<rating);
    stars.push(
    <Star key={i} selected={selected} />);
          }
    return(
      <div>
            {stars}
      </div>

    )
  }
}

export default StarRating;
