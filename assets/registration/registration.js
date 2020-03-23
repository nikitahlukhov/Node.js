let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    const userData = {
        username: e.target.username.value,
        password: e.target.password.value,
      }
    
      fetch("http://localhost:8000/api/registration", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(userData),
        })
        .then((response) =>{  
          if (response.status !== 200) {  
            alert('such user exists') 
          } else {
            location.href = "http://localhost:8000/login"
          } 
        })    
    e.preventDefault();
})