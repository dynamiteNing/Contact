const api = {
  hostname: '/api/v1',
  checkemail(data) {
    return fetch(`${this.hostname}/member/checkemail`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    }).then((response) => response.json());
  },
  // signin(data) {
  //   return fetch(`${this.hostname}/user/signin`, {
  //     body: JSON.stringify(data),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //     method: 'POST',
  //   }).then((response) => response.json());
  // },
};
