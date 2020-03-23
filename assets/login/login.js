let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    const userData = {
        username: e.target.username.value,
        password: e.target.password.value,
      }
    
      fetch("http://localhost:8000/api/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(userData),
        })
        .then((response) =>{  
            if (response.status !== 200) {  
              alert('register first') 
              throw Error(response.statusText);
            } else {
              return response.json();        
            }
          })
          .then(token => {
            window.localStorage.token = JSON.stringify(token)
            const newLocation = "http://localhost:8000/todoList/";
            window.location = newLocation;
        })    
    e.preventDefault();
})