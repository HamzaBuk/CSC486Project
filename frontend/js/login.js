const login = () => {
    alert('login called');
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    input = {
        username: username,
        password: password
    }

    fetch('/auth/login', {method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)}
    ).then((res) => {
        return res.json()
    }).then((res => {
        if(res.token){
            localStorage.setItem('token', res.token);
            location = "/recipe.html";
        }
        else{
            alert("Could not log in.");
        }
    }));

}

const register = () => {
    alert("register called");
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    input = {
        username: username,
        email: email,
        password: password
    }

    fetch('/auth/register', {method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)}
    ).then((res) => {
        return res.json()
    }).then((res => {
        if(res.token){
            localStorage.setItem('token', res.token);
            location = "/recipe.html";
        }
        else{
            alert("Could not register.");
        }
    }));
}