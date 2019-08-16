// Global variables
// let imageId = 3261
// const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
// const likeURL = `https://randopic.herokuapp.com/likes/`
// const commentsURL = `https://randopic.herokuapp.com/comments/`
// Doesn't work
// CORS

const image = {
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

// Get image data
const imageURL = image.url
let likeCount = image.like_count
let imageName = image.name
let imageComments = image.comments

// Get HTML elements
const h4 = document.getElementById('name')
const likesSpan = document.getElementById('likes')
const likeButton = document.getElementById('like_button')
const div = document.getElementById('image_card')
const likeDisplay = document.getElementById('like_display')

// Create image
let img = document.createElement('img')

// Get comment form elements
const commentForm = document.getElementById('comment_form')
const commentInput = document.getElementById('comment_input')
const commentList = document.getElementById('comments')
const submitButton = document.getElementById('submit_button')
// Add event listener to the form
commentForm.addEventListener('submit', () => commentImage(event))



// Create
// Only one image
// I know we don't need the create functionality, but since I can't get anything to work I might as well demonstrate something else I know how to do
const createImage = () => {
  newImageForm.addEventListener('submit', () => {
		event.preventDefault()
    let newImageForm = document.createElement('form')
    let urlInput = document.createElement('input')
    urlInput.placeholder = "Enter a URL"
    urlInput.id = "url-input"
    let nameInput = document.createElement('input')
    nameInput.placeholder = "Enter a name"
    nameInput.id = "name-input"
    newImageForm.append(urlInput, nameInput)

    fetch(imageURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          url: urlInput.value,
          name: nameInput.value,
          like_count: 0,
          comments: []
      })
    })
    .then(resp => resp.json())
    .then(image => {
      renderImage(image)
      urlInput.value = ""
      nameInput.value = ""
    })
    .catch(alert)
})
}



// Read/Fetch

// Not going to work with CORS
const fetchImages = () => {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => renderImage(image))
  .catch(alert)
    console.log(image.name);
}

const renderImage = (image) => {
  img.src = imageURL
  likesSpan.innerText = likeCount
  h4.innerText = imageName

  likeButton.addEventListener('click', (event) => {
    console.log(`${image} clicked`);
    likeImage(image)
  })

  div.append(img, h4, likeDisplay, likeButton, commentForm)
}
  

// Update
const likeImage = (event, image) => {
  fetch(imageURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      like_count: ++likeCount
    })
  })
  .then(resp => resp.json())
  .then(image => {
    likeSpan.innerText = `${image.like_count}`
  })
  .catch(alert)
}

// How am I supposed to do anything if I can't fetch or test anything

const commentImage = (image) => {
  event.preventDefault()
  let newComment = commentInput.value
  imageComments.push(newComment)
  let deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete Comment"
  deleteButton.addEventListener('click', (event) => {
    deleteComment(comment.id)
  })
  li = document.createElement('li')
  li.append(newComment, deleteButton)

  fetch(imageURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      body: JSON.stringify({
        comments: imageComments.content
      })
    }
  })
}

// Delete
const deleteComment = (event, id) => {
  fetch(`${imageURL}/${id}`, {
    method: "DELETE"
  })
  .then(div.remove())
  .catch(err => alert(err))
}

// Call functions
// fetchImages()
renderImage()






// Coding blind :\ This really sucks