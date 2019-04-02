
const root = document.getElementById('root');
const spinnerTarget = document.querySelector('div.loading');
const contentWrapper = document.querySelector('div.contentWrapper');

window.onload = () => {
  httpRequest('GET', 'https://jsonplaceholder.typicode.com/users', null, data => {
    for (let i = 0; i < data.length; i++) {
      showList(data[i], i);
    }
  });
};
/**
 * Get catty images from https://docs.thecatapi.com/.
 */
async function getCatsAvatar (onSuccessCallback = () => {}) {
  try {
    let response = await fetch('https://api.thecatapi.com/v1/images/search');
    let data = await response.json();
    return onSuccessCallback(data);

  } catch(err) {
    console.error(err);
  }
}
/**
 * Implements a function, wich make a http request.
 * @param {String} header 
 * @param {String} url 
 * @param {Object} data 
 * @param {Function} onSuccessCallback 
 */
function httpRequest (header, url, data = null, onSuccessCallback = () => {}) {
  spinner(spinnerTarget, 'on');
  let req = new XMLHttpRequest();
  req.open(header, url, true);
  req.onload = () => {
    if (req.status === 200 && req.readyState === 4) {
      spinner(spinnerTarget, 'off');
      return onSuccessCallback(JSON.parse(req.responseText));
    }
  };
  req.send(data);
  req.onerror = () => {
    console.log(`Error ${this.status}`);
  };
}

/**
 * Paint all cards.
 * @param {Array} data 
 * @param {Number} index 
 */
function showList (data, index) {
  const cards = document.createElement('div');
  cards.className = 'userProfile__card';
  let {name,id, address: {city, street, suite, zipcode}, company: {name: companyName}, phone} = data;
  console.log(data);
  let html = 
  `
    <div class="avatar">
      <img class="avatar__image"/>
    </div>
    <div class="cardsDescription">
      <div class="cards__header">
        <p class="phone">Phone: ${phone}</p>
        <p class="company">Company: ${companyName}</p>
        <p class="city">City: ${city}</p>
        <p class="street">Street: ${street}</p>
        <p class="suite">Suite: ${suite}</p>
        <p class="zipcode">Zipcode: ${zipcode}</p>
      </div>
      <div class="cards__info">
        <p class="username"><a class="showModalBtn" href="#">${name}</a></p>
      </div>
    </div>
    <div class="btnSection">
      <button type="Submit" class="editBtn">Edit</button>
      <div class="editSection">
        <input type="text" class="editInput" value="${name}" disabled>
        <input type="text" class="editInput" value="${companyName}" disabled>
        <input type="text" class="editInput" value="${phone}" disabled>
        <input type="text" class="editInput" value="${city}" disabled>
        <input type="text" class="editInput" value="${street}" disabled>
        <input type="text" class="editInput" value="${suite}" disabled>
        <input type="text" class="editInput" value="${zipcode}" disabled>
      </div>
      <button type="Submit" class="saveBtn" disabled>Save</button>
      <button type="Submit" class="deleteBtn">Delete</button>
    </div>
  `;

  cards.innerHTML = html;

  let avatarNode = cards.getElementsByClassName('avatar__image')[0];
  const deleteBtn = cards.getElementsByClassName('deleteBtn')[0];
  const editBtn = cards.getElementsByClassName('editBtn')[0];
  const showModalBtn = cards.getElementsByClassName('showModalBtn')[0];
  deleteBtn.onclick = () => {
    deleteUser(id, cards);
  };
  editBtn.onclick = () => {
    editUser(data, cards);
  };
  showModalBtn.onclick = () => {
    httpRequest('GET', `https://jsonplaceholder.typicode.com/posts?userId=${id}`, null, postsRes => {

      httpRequest('GET', `https://jsonplaceholder.typicode.com/comments?${postId(postsRes.length)}`, null, commentsRes => {
        renderPosts(postsRes, commentsRes);
      });
      
    });
    showModal();
  };
  // httpRequest('GET', 'https://api.thecatapi.com/v1/images/search', null, result => {
  //   avatarNode.src = result[0].url;
  // });
  if (localStorage.getItem(`image${index}`) === null) {
    getCatsAvatar(result => {
    avatarNode.src = result[0].url;
    localStorage.setItem(`image${index}`, JSON.stringify(result[0].url));
    });
  } else {
    avatarNode.src = JSON.parse(localStorage.getItem(`image${index}`));
  } 

  root.appendChild(cards);
}

/**
 * Prepare all GET arguments.
 * @param {Number} length 
 */
function postId (length) {
  let res = 'postId=1';
  for (let i = 2; i <= length; i++) {
    res += `&postId=${i}`;
  }
  return res;
}
//----------------------------------------------------EDIT----------------------------------------------------
/**
 * Switch input disabled mode.
 * @param {Object HTML Collection} editInput 
 * @param {Object HTML Collection} saveBtn 
 */
function disableInputs (editInput, saveBtn) {
  editInput.forEach(element => {
    element.disabled = !element.disabled;
  });
  saveBtn.disabled = !saveBtn.disabled;
}
/**
 * Implements a function, which change textValue in usercard.
 * @param {HTML Collection} cards 
 * @param {Object} newValues
 */
function repaintUserInfo(cards, newValues) {
  for (let i = 2; i < arguments.length; i++) {
    cards.getElementsByClassName(arguments[i])[0].innerText = `${arguments[i]}: ${newValues[arguments[i]]}`;
  }
}
/**
 * Edit username and make PUT request.
 * @param {Object} data 
 * @param {Object HTML Collection} saveBtn 
 * @param {Object HTML Collection} editInput 
 */
function editUser(data, cards) {
  const editInput = cards.querySelectorAll('input.editInput');
  const saveBtn = cards.getElementsByClassName('saveBtn')[0];
  disableInputs(editInput, saveBtn);
  
  saveBtn.onclick = () => {
    disableInputs(editInput, saveBtn);
    let {name, id, address: {city, street, suite, zipcode}, company: {name: companyName}, phone} = data;
    let newValues = {
      name: name, 
      company: companyName, 
      phone: phone, 
      city: city, 
      street: street, 
      suite: suite, 
      zipcode :zipcode
    };
    let i = 0;
    for (let key in newValues) {
      newValues[key] = editInput[i].value;
      i++;
    }

    cards.querySelector('a.showModalBtn').innerText = newValues.name;
    repaintUserInfo(cards, newValues, 'company', 'phone', 'city', 'street', 'suite', 'zipcode');
    httpRequest('PUT', `https://jsonplaceholder.typicode.com/users/${id}`, Object.assign({id: id}, newValues), () => {
      console.log(`User info was successfuly edited!`);
    });
  };
  editInput.onkeyup = () => {
    if (event.which === 13) {
      saveBtn.onclick();
    }
  }
}
//------------------------------------------------------------------------------------------------------------
/**
 * Delete user card and make DELETE request.
 * @param {Number} index 
 * @param {Object} el 
 */
function deleteUser (index, el) {
  httpRequest('DELETE', `https://jsonplaceholder.typicode.com/users/${index}`, null, () => {
    console.log(`User with id: ${index} was deleted successfuly!`);
  });
  el.remove();
}
function showModal () {
  let modal = document.getElementById('myModal');
  let span = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';

  span.onclick = () => {
    modal.style.display = 'none';
    contentWrapper.innerHTML = '';

  };

  window.onclick = event => {
    if (event.target == modal) {
      modal.style.display = 'none';
      contentWrapper.innerHTML = '';
    }
  };
}

function renderPosts (posts, comments) {
  let content = document.createElement('div');
  content.classList.add('modal-content__text');
  content.innerHTML = '<h1 class="postsHeader">Posts</h1>';
  for (let i = 0; i < posts.length; i++) {
    let {body, title} = posts[i];
    let html = `
    <div class="post">
      <h2 class="post__title">${title}</h3>
      <hr />
      <h3 class="post__body">Body</h3>
      <p>${body}</p>
      <hr />
      <h3 class="post__comments">Comments</h3>
      ${getCommentsForPost(comments, ++i)}
    </div>
    `;
    content.innerHTML += html;

  }
  contentWrapper.appendChild(content);
}

function getCommentsForPost (comments, postId) {
  let output = '';
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].postId === postId) {
      output += `
      <p class="comments__userEmail"><b>${comments[i].email}</b></p>
      <p class="comments__body"># <i>${comments[i].body}</i></p>
      `;
    }
  }

  return output;
}

