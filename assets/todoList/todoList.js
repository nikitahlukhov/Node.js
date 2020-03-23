  let userInfo
  let token
  let tasks

  if (window.localStorage.token) {
    userInfo = JSON.parse(window.localStorage.token);
    token = userInfo.jwt_token
    tasks = userInfo.tasks;
  } else {
    location.href = "http://localhost:8000/login";    
  }

  if (token) {
    fetch("http://localhost:8000/api/auth", {
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    })
    .then((response) => {
      if (response.status === 400) {
        location.href = "http://localhost:8000/login"
      } 
    })
  }

  const list = document.querySelector('#book-list ul');
  const forms = document.forms;
  const logoutButton = document.getElementById('logout')
  

  if (tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const value = tasks[i].value;
      const li = document.createElement('li');
      const bookName = document.createElement('span');
      const deleteBtn = document.createElement('span');
      li.setAttribute('value', i)
  
      bookName.textContent = value;
      deleteBtn.textContent = 'delete';
      bookName.classList.add('name');
      deleteBtn.classList.add('delete');
      li.appendChild(bookName);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    }  
  }
  

  // delete books
  list.addEventListener('click', (e) => {
    if(e.target.className == 'delete'){
      fetch(document.URL + '/auth', {
        method: 'GET',
        headers: {
          'Authorization': token,
        }
      })
      .then((response) => {
        if (response.status !== 200) {  
          alert('You have no power here')  
        } else { 
          const li = e.target.parentElement;
          li.parentNode.removeChild(li);
          tasks.splice(li.getAttribute('value'), 1);
          window.localStorage.token = JSON.stringify(userInfo);
          fetch(document.URL, {
            method: 'PUT',
            mode: "cors",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(tasks),
          })
        }
      })      
    }
  });

  // add books
  const addForm = forms['add-book'];
  addForm.addEventListener('submit', function(e){
    e.preventDefault();
    
        
        // create elements
    const value = addForm.querySelector('input[type="text"]').value;
    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');
    const index = tasks.length;
    li.setAttribute('value', index)

    // add text content
    bookName.textContent = value;
    deleteBtn.textContent = 'delete';

    // add classes
    bookName.classList.add('name');
    deleteBtn.classList.add('delete');

    // append to DOM
    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    
    tasks.push({value})    
    window.localStorage.token = JSON.stringify(userInfo);
    
    fetch(document.URL, {
      method: 'PUT',
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(tasks),
    })
      
    
  });

    logoutButton.addEventListener('click', () => {
    localStorage.clear();
    location.href = "http://localhost:8000/login";    
  })
