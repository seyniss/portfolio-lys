import React,{useEffect,useState} from 'react'
// import works from "../utils/works.js"
import  "./styles/Work.scss"


const Work = () => {
  


  return (
    <div>

      <div>
        <ul className="lst">
          <li>
            <a href="#" className="t-wrap">

            <h4 className="list-lst"></h4>
            <p className="txt"></p>
            <div className="hash-wrap">
              <span className="hash"></span>
            </div>
            </a>
            <a href="#" className="img-wrap"></a> {/*배경에 이미지*/}
          </li>
        </ul>



      </div>
    </div>
  )
}

export default Work