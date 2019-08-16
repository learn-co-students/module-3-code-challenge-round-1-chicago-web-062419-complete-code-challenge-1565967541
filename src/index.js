// You will need to add/update:

// - the image url
// - the image name
// - the number of likes
// - any comments in an unordered list
const sampleObject = {
  "id": 1,
  "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
  "name": "The Internet!",
  "like_count": 0,
  "comments": [
    {
      "id": 5941,
      "content": "first comment!",
      "image_id": 1158,
      "created_at": "2018-10-18T17:06:14.859Z",
      "updated_at": "2018-10-18T17:06:14.859Z"
    }
  ]
}
const commentObject = sampleObject.comments[0]


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageURL = "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg"
  
  // let imageId = 3254 //Enter the id from the fetched image here
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  // const likeURL = `https://randopic.herokuapp.com/likes/`
  // const commentsURL = `https://randopic.herokuapp.com/comments/`

  //* fetch(imageURL)
  // .then(resp => resp.json())
  // .then(picData => displayImage(picData))

  const displayImage = (sampleObject) => {
    //find html and add/update to show image
    let image = document.getElementById('image')
    image.src = sampleObject.url
    //=> "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg"
    let nameTag = document.getElementById('name')
    nameTag.innerText = sampleObject.name
    // =>"The Internet!"
  }
  displayImage(sampleObject)
  

  const updateLikeCount = () => {
    let likeButton = document.getElementById("like_button")
    let likes = document.getElementById("likes")
    
    likeButton.addEventListener('click', () => {
      sampleObject.like_count += 1
      likes.innerHTML = sampleObject.like_count
      // update the html and the object/fetch data like_count attr.
      //! data will not persist on refresh due to no database/host or fetching. In console object is updated
      // make a POST request to persist the new Like in the backend database
  // configurationObject = {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json",  
  //   "Accept": "application/json"},
  //   body: {like_count: sampleObject.like_count }//image_id: (insert image id here)
  // }
  //* fetch(likeURL, configurationObject)
    })
  }
updateLikeCount(sampleObject)
  //call function to implement like feature

  const addComment = (commentObject) => {
    let form = document.getElementById('comment_form')
    let ul = document.getElementById('comments') //find ul
    let input = document.getElementById('comment_input')
    //when submit, add the input value to a newly created li and append to ul
    form.addEventListener('submit', (event) => {
      event.preventDefault() // keep page from refreshing
      let li = document.createElement('li')      //create li
      li.innerText = input.value
      ul.appendChild(li)
      input.placeholder.value = "Add a New Comment!"

      //below: persist comment data using fetch post
      // configurationObject = {
      //   method: "POST",
      //   headers: {"Content-Type": "application/json",  
      //   "Accept": "application/json"},
      //   body: {image_id: 1158, content: "first comment!"}
      // }
      //* fetch(commentsURL, configurationObject)
    })
 
  }
addComment(commentObject)

  

});//end domContentLoaded
