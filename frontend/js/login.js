const backendURL = `http://${window.location.hostname}:4000`;

const login = () => {
    alert('login called');
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const input = {
        username: username,
        password: password
    };

    fetch(`${backendURL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    }).then((res) => res.json()
    ).then((res) => {
        if (res.token) {
            localStorage.setItem('token', res.token);
            location = "/recipe.html";
        } else {
            alert("Could not log in.");
        }
    });
};

const register = () => {
    alert("register called");
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const input = {
        username: username,
        email: email,
        password: password
    };

    fetch(`${backendURL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    }).then((res) => res.json()
    ).then((res) => {
        if (res.token) {
            localStorage.setItem('token', res.token);
            location = "/recipe.html";
        } else {
            alert("Could not register.");
        }
    });
};
