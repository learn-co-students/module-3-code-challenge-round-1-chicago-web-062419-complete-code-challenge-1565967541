document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3260 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const commentInput = document.getElementById('comment_input');

  fetch('https://randopic.herokuapp.com/images/3260')
    .then(response => response.json())
    .then(data => addImage(data));

  function addImage(data) {
    const insertName = document.getElementById('name');
    const insertImage = document.getElementById('image');
    const likesCount = document.getElementById('likes');      insertName.innerText = `${data.name}`
    insertImage.src = `${data.url}`;
    likesCount.innerText = `${data.like_count}`;
    insertName.innerText - `${data.name}`
    insertName.appendChild(insertName);
    insertImage.appendChild(insertImage);
    likesCount.appendChild(likesCount);
  }
  const likeBtn = document.getElementById('like_button');

  likeBtn.addEventListener('click', postNewLike);

  
  
  function postNewLike() {
    let userLike = {
      like_count: like_count + 1
    };
    
    let configObjLike = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userLike)
    };
    fetch('https://randopic.herokuapp.com/images/${imageId}', configObjLike)
      .then(response => response.json())
      .then(object => console.log(object))
      .catch(function(error) {
        alert('Ooops, you did it again');
        console.log(error.message);
      })
  };

  
    // function postNewComment() {
    //   let configObjComment = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     },
    //   }
    // }
})
