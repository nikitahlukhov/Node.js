

  let userInfo
  let token
  let tasks
  let user

  let list = document.querySelector('#book-list ul');
  const forms = document.forms;
  const logoutButton = document.getElementById('logout')

  if (window.localStorage.token) {
    userInfo = JSON.parse(window.localStorage.token);
    token = userInfo.jwt_token
  } else {
    location.href = "http://localhost:8000/login";    
  }
  
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
      return response.json();
    })
    .then((response) => {
      user = response; 
      getTasks();
    })  
  
// delete tasks
  list.addEventListener('click', (e) => {
    if(e.target.className == 'delete'){

          const li = e.target.parentElement;
          let index = li.getAttribute('value');
          deleteTask(index); 
    }
  });

  // add tasks
  const addForm = forms['add-book'];
  addForm.addEventListener('submit', function(e){
    e.preventDefault()
    const value = addForm.querySelector('input[type="text"]').value;

    addTask(value);    
    });

  logoutButton.addEventListener('click', () => {
  localStorage.clear();
  location.href = "http://localhost:8000/login";    
  })

  function getTasks () {
    
    fetch("http://localhost:8000/api/tasks/" + user, {
          method: "GET"
        }) 
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          tasks = response;
          
          let newUl = document.createElement('ul')
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
            
            newUl.appendChild(li);
          }  
          
          list.innerHTML = newUl.innerHTML          
        })
  }

  function addTask(value) {
      
    let newTask = {
      value: value,
    }

    fetch("http://localhost:8000/api/tasks/" + user, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newTask),
      })
      .then(() => {
        getTasks();
      })
  }

  function deleteTask(index) {    
    
    fetch("http://localhost:8000/api/tasks/" + user + "/" + index, {
            method: 'DELETE',
            mode: "cors",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then(() => {
            getTasks();
          })
  }
  