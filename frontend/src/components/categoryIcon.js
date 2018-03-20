import React from 'react'
import '../styles/ui/semantic.min.css'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'



export function colorForCategory({cat}) {

  switch (cat) {
    case "react":
      return "green"
    case "redux":
      return "red"
    case "udacity":
      return "blue"
    default:
      return "orange"


  }

}


export function iconForCategory({cat}) {



  const color = colorForCategory({
    cat
  })
  let link = "/category/" + cat
  switch (cat) {
    case "react":
      return <Link to={link}><i class="dollar sign icon" style={{
          color
        }}></i></Link>
    case "redux":
      return <Link to={link}><i class="gem outline icon" style={{
          color
        }} ></i></Link>
    case "udacity":
      return <Link to={link}><i class="heart outline icon" style={{
          color
        }} ></i></Link>
    default:
      return <i class="tag icon" style={{
          color
        }}></i>


  }

}


class CatIcon extends React.Component {


  state = {
    path: 'react',
    title: ""
  }




  render() {

    const {path, title} = this.state

    let link = "/" + path
    let ic = iconForCategory(path)


    return (

      // <Link to={link}> // </Link>
      <div>
     
    {ic}
     
     </div>
    )
  }

}






export default CatIcon
