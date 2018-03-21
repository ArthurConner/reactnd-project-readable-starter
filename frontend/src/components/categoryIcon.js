import React from 'react'
import '../styles/ui/semantic.min.css'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'



function colorForCategory({cat}) {

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


function iconForCategory({cat}) {



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



export function categoryFromProps({categories}) {


  //console.log("we have cats of ",categories,Object.keys(categories))

  if (!(categories)) {
    return {
      categories: {},
      catKeys: []
    }
  }


  let catKeys = Object.keys(categories)
  catKeys.sort()

  var arrayLength = catKeys.length;

  for (var i = 0; i < arrayLength; i++) {
    const x = catKeys[i]
    let cat = categories[x]
    cat["color"] = colorForCategory({
      cat: x
    })
    const name = cat["name"]
    cat["desc"] = name.charAt(0).toUpperCase() + name.slice(1);
    categories[x] = cat
  }

  // console.log("reduced",categories)


  return {
    categories,
    catKeys
  }

}

export function postFromProps({posts, categories} , ownProps) {

  let cats = categoryFromProps({
    categories
  })
  if (!(ownProps.postid)) {
    return {
      ...cats,
      post: {}
    }
  }


  if (!(posts[ownProps.postid])) {
    return {
      ...cats,
      post: {}
    }
  }

  const post = posts[ownProps.postid]
  return {
    ...cats,
    post
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
