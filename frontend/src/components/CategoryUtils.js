
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




