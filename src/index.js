document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3252 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const card = document.getElementById('image_card')
  const likeButton = document.getElementById('like_button')
  const likeDisplay = document.getElementById('likes')
  const commentSection = document.getElementById('comments')

  function getImage(){  // fetch the image
    fetch(imageURL)
    .then(resp =>{
      return resp.json();
    })
    .then(json =>{
     // console.log(json)
      createDisplay(json)
    })
  }
  
  function createDisplay(obj){ // create a 'card
    document.getElementById('name').innerHTML = obj['name']

    let img = document.createElement('img')
    img.src = obj['url']
    card.prepend(img)

    // setup the like-counter for the image-display thing
    likeDisplay.innerHTML = obj['like_count']
    likeButton.addEventListener('click' ,()  =>{
      let currentLikes = parseInt(likeDisplay.innerHTML , 10)
      currentLikes++;
      console.log(currentLikes)
      likeDisplay.innerHTML = currentLikes

      // post a new like to the API
      fetch(likeURL , {
        method: 'POST' ,
        headers: {
          'Content-Type' : 'application/json' ,
          'Accept' : 'application/json'
        } ,
        body: JSON.stringify({
          'image_id' : imageId
        })
      }).then(resp =>{
        return resp.json();
      }).then(json =>{
        console.log('POSTING A LIKE')
      })
    })
    
    //displaying comments on-load
    const commentForm = document.getElementById('comment_form') // get comment-form

    // load the comment initially
    Object.keys(obj['comments']).forEach(comment =>{
      let newLi = document.createElement('li')
      newLi.innerHTML = `${obj['comments'][comment]['content']}   `
      commentSection.appendChild(newLi)

      // attempting the delete function
      let btn = document.createElement('button')
      btn.innerHTML = 'Delete Comment'
      newLi.appendChild(btn)

      btn.addEventListener('click' , (e)=>{
        e.preventDefault();
        //console.log(obj['comments'][comment]['id'])
        fetch(commentsURL + `${obj['comments'][comment]['id']}` , {
          method: 'DELETE' ,
          headers: {
            'Content-Type' : 'applicaiton/json' ,
            'Accept' : 'application/json'
          } , 
          body : JSON.stringify({
            'id' : obj['comments'][comment]['id']
          })
        }).then(()=>{
          commentSection.removeChild(newLi)
        })
      })
    })

    //fetch new Comment event
    commentForm.addEventListener('submit' , (e)=>{
      e.preventDefault(); // don't refresh the page
      //console.log(commentForm.comment.value)
      let newComment = document.createElement('li')
      newComment.style.listStyleType = 'none'
      newComment.innerHTML = commentForm.comment.value
      commentSection.appendChild(newComment)  //creating the new comment-element

      // POST new comment to the API
      fetch(commentsURL , {
        method: 'POST' , 
        headers:{
          'Content-Type' : 'application/json' ,
          'Accept' : 'application/json'
        } ,
        body: JSON.stringify({
          'image_id' : imageId ,
          'content' : commentForm.comment.value
        })
        }).then(resp =>{  // two seemingly-unnecessary lines , can be removed
          return resp.json();
        }).then((json) =>{  // no json required here
          document.getElementById('comment_input').value = "" // clear the input value
          console.log(json['id'])

          // could be refactored, repeat code from before to add a button
          let btn = document.createElement('button')
          newComment.appendChild(btn)
          btn.innerHTML = 'Delete Comment'

          btn.addEventListener('click' , (e)=>{
            e.preventDefault();
            //console.log(obj['comments'][comment]['id'])
            fetch(commentsURL + `${json['id']}` , {
              method: 'DELETE' ,
              headers: {
                'Content-Type' : 'applicaiton/json' ,
                'Accept' : 'application/json'
              } , 
              body : JSON.stringify({
                'id' : json['id']
              })
            }).then(()=>{
              commentSection.removeChild(newComment)
            })
          })
      })
    })
  }
  
  getImage();


  //literally just styling cause time and I didn't want to break things
  let displayCard =  document.getElementsByClassName('container')[0]
  displayCard.style.backgroundColor = '#E0FFFF'
  displayCard.style.borderRadius = '5em'
  displayCard.style.padding = '1em'
  displayCard.style.textAlign = 'center'
  displayCard.style.margin = '1em'
})


