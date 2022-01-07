const AUTH_URL = "http://localhost:5000/api/auth";

class AuthService {
  login = async (username, password) => {
    try {
      const res = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
      })

      const data = await res.json()
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (e) {
      console.error(e)
    }
  }

  register = async (username, email, password) => {
    try {
      const res = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ "username": username, "email": email, "password": password }),
    })

    const data = await res.json()
    localStorage.setItem('user', JSON.stringify(data))
    return data
    } catch(e) {
      console.error(e)
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();