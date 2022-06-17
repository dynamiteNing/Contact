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
  signin(id, password) {
    return fetch(`${this.hostname}/main/signin?id=${id}&password=${password}`, {
      method: 'GET',
    });
  },
  signup(data) {
    return fetch(`${this.hostname}/main/signup`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
  },
};
