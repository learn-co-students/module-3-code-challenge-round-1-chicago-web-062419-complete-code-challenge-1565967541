document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = '3255'  

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.querySelector('#image')

  const likeButton = document.querySelector('#like_button')

  const commentForm = document.querySelector('#comment_form')

  const imageObj = {
    "id": 3255,
    "url": "http://blog.flatironschool.com/wp-content/uploads/2017/06/5-year-event-352x200.jpg",
    "name": "Avi and Adam",
    "like_count": 0,
    "comments": [
      {
        "id": 56590,
        "content": "first comment!",
        "image_id": 3255,
        "created_at": "2019-08-16T15:03:53.000Z",
        "updated_at": "2019-08-16T15:03:53.000Z"
      }
    ]
  }

  // const fetchImage = () => {
  //   fetch(imageURL)
  //     .then(resp => resp.json())
  //     .then(imageData => renderImage(imageData))
  // }

  const renderImage = (imageObj) => {
    const comments = document.querySelector('#comments')

    const myImage = document.createElement('img')
    myImage.src = imageObj.url

    const imageName = document.createElement('h4')
    imageName.innerHTML = imageObj.name

    const imageLikes = document.createElement('span')
    imageLikes.innerHTML = imageOBJ.like_count

    const imageComments = document.createElement('li')
    imageComments = imageObj.comments.content

    image.append(myImage, imageName, imageLikes, imageComments)
   
  }

  likeButton.addEventListener('click', ()=>{
    likeURL
    const reqObj = {
      method: ('POST'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      body: (++imageLikes.like_count)
    }
  })

  commentForm.addEventListener('submit', ()=> {
    commentsURL 
    const respObj = {
      method: ('POST'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      body: {imageObj.comments.content}
    }
  })

  renderImage()

})


// const renderImage = (imageData) => {
//   imageData.forEach((key) =>{

  
  
//   const image = document.createElement('img')
//   image.src = imageURL

//   imageCard.append(image)
//  }
// })

// const fetchImage = () => {
//   fetch('https://randopic.herokuapp.com/images/3255')
//     .then(resp => resp.json())
//     .then(imageData => console.log(imageData))
// }

// const renderImage = (imageData) => {
  
//   const image = document.createElement('img')
//   console.log('https://randopic.herokuapp.com/images/3255'.url)
 
// }