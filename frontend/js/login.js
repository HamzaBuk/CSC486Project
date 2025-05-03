const backendURL = `http://${window.location.hostname}:4000`;

const login = async () => {
    alert('login called');
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const input = {
        username,
        password
    };

    try {
        const response = await fetch(`${backendURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });

        const res = await response.json();

        if (res.token) {
            localStorage.setItem('token', res.token);
            location = "/recipe.html";
        } else {
            alert("Could not log in.");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Error logging in.");
    }
};

const register = async () => {
    alert("register called");
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const input = {
        username,
        email,
        password
    };

    try {
        const response = await fetch(`${backendURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });

        const res = await response.json();

        if (res.token) {
            localStorage.setItem('token', res.token);
            location = "/recipe.html";
        } else {
            alert("Could not register.");
        }
    } catch (err) {
        console.error("Register error:", err);
        alert("Error registering.");
    }
};
