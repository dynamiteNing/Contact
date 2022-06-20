export const api = {
  hostname: '/api/v1',
  checkemail(email, jwtToken) {
    return fetch(`${this.hostname}/main?email=${email}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
  },
  checkjwtexpire(timestamp) {
    return fetch(`${this.hostname}/main/jwt?timestamp=${timestamp}`, {
      method: 'GET',
    });
  },
  signin(id, password) {
    return fetch(`${this.hostname}/main/signin`, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        password: password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  },
  signup(data) {
    return fetch(`${this.hostname}/main/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  },
  getRooms(email){
    return fetch(`${this.hostname}/chat?email=${email}`, {
      method: 'GET',
    });
  },
};
