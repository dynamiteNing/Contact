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
  getRooms(email) {
    return fetch(`${this.hostname}/chat?email=${email}`, {
      method: 'GET',
    });
  },
  getFriends(email) {
    return fetch(`${this.hostname}/directory/friends?email=${email}`, {
      method: 'GET',
    });
  },
  getNotfriends(email) {
    return fetch(`${this.hostname}/directory/notfriends?email=${email}`, {
      method: 'GET',
    });
  },
  getProfile(artist) {
    return fetch(`${this.hostname}/directory?artist=${artist}`, {
      method: 'GET',
    });
  },
  subscribe(email, artist, prime, name, phone, time) {
    return fetch(`${this.hostname}/subscribe`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        artist: artist,
        prime: prime,
        name: name, 
        phone: phone,
        time: time,
      })
    });
  },
  postChatMessage(email, role, room, time, message) {
    return fetch(`${this.hostname}/chat/message`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        role: role,
        room: room,
        time: time,
        message: message,
      })
    });
  },
  getChatMessage(email, role, room) {
    return fetch(`${this.hostname}/chat/message?email=${email}&role=${role}&room=${room}`, {
      method: 'GET',
    });
  },
  getPurchased(email) {
    return fetch(`${this.hostname}/purchased?email=${email}`, {
      method: 'GET',
    });
  },
};
