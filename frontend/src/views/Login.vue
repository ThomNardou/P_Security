<template>

  <div class="login">
    <div class="container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="login()">
          <div class="input-box">
            <input type="text" required id="name">
            <label>Name</label>
          </div>
          <div class="input-box">
            <input type="password" required id="password">
            <label>Password</label>
          </div>
          <p class="error">{{ errorMessage }}</p>
          <button type="submit" class="btn">Login</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
</script>

<script>
export default {
  data() {
    return {
      errorMessage: '',
      hasError: false,
      ErrorCode: 0
    }
  },
  methods: {
    async login() {
      // Getting the username input value
      let username = document.getElementById('name').value

      // Getting the password input value
      let password = document.getElementById('password').value

      console.log(password)

      // Variable that contains the api call
      let APICall = 'http://localhost:8080/auth'

      // POST with axios with the username and the password
      await axios.post(APICall, {
        name: username,
        password: password
      }, {
        withCredentials: true
      }).then((result) => {
        this.usernameError = ''
        this.passwordError = ''
        location.href = '/'

      }).catch((error) => {
        if (error.status == 500) {
          this.errorMessage = error.data.message
        } else {
          this.errorMessage = 'The username or the password is incorrect'
        }

      })
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: -1;
}

.container {
  position: relative;
  width: 256px;
  height: 256px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container span {
  position: absolute;
  left: 0;
  width: 32px;
  height: 6px;
  background: #41B883;
  border-radius: 8px;
  transform-origin: 128px;
  transform: scale(2.2) rotate(calc(var(--i) * (360deg / 50)));
  animation: animateBlink 3s linear infinite;
  animation-delay: calc(var(--i) * (3s / 50));
}

@keyframes animateBlink {
  0% {
    background: #41B883;
  }

  25% {
    background: white;
  }
}

.login-box {
  position: absolute;
  width: 400px;
  /* background: red; */
}

.login-box form {
  width: 100%;
  padding: 0 50px;
}

h2 {
  font-size: 2em;
  color: #41B883;
  text-align: center;
}

.input-box {
  position: relative;
  margin: 25px 0;
}

.input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: 2px solid #2c4766;
  outline: none;
  border-radius: 40px;
  font-size: 1em;
  color: black;
  padding: 0 20px;
  transition: .5s ease;
}

.input-box input:focus,
.input-box input:valid {
  border-color: #41B883;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 1em;
  color: black;
  pointer-events: none;
  transition: .5s ease;
}

.input-box input:focus~label,
.input-box input:valid~label {
  top: 1px;
  font-size: .8em;
  background: white;
  padding: 0 6px;
  color: #41B883;
}

.forgot-pass {
  margin: -15px 0 10px;
  text-align: center;
}

.forgot-pass a {
  font-size: .75em;
  color: black;
  text-decoration: none;
}

.forgot-pass a:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  height: 45px;
  background: #41B883;
  border: none;
  outline: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 1em;
  color: #1f293a;
  font-weight: 600;
}

.signup-link {
  margin: 20px 0 10px;
  text-align: center;
}

.signup-link a {
  font-size: 1em;
  color: #41B883;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}

p {
  color: #fff;
  font-size: .75rem;
}
</style>
