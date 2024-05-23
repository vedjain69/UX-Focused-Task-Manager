import React, { Component } from "react";

export class cardComp extends Component {
  render() {
    const {title} =this.props
    const {desc}= this.props
    const {complete}=this.props
    const {dlt}=this.props
    const {strike}=this.props
    const {textcolor}=this.props

    return (

      <div className="cardcomp ">
        <div class="row">
          <div className="col-7" >
            <h3 style=
              {{marginTop: "6px",color:textcolor}}>{strike==="1"?<strike>{title}</strike>:<>{title}</>}
            </h3>
            <p> {strike==="1"?<strike>{desc}</strike>:<>{desc}</>}</p>
          </div>
          <div class="col-5 actions">
            <button type="button " class="btn actbut" style={{backgroundColor:"#ffc107", color:"black"}} onClick={complete}>
              Complete
            </button>
            <button type="button " class="btn actbut" style={{backgroundColor:"white", color:"black"}} onClick={dlt}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default cardComp;
