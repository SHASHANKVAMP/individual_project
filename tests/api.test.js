const axios = require('axios');
API_URL="http://localhost:4000";

test('test light array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/light`)
      .then(resp => resp.data)
      .then(resp => {
        expect(resp[0].deviceName).toEqual('light3');
      });
    });

test('test ac array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/ac`)
      .then(resp => resp.data)
      .then(resp => {
        expect(resp[0].deviceName).toEqual('Ac1');
      });
    });

test('test security array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/security`)
      .then(resp => resp.data)
      .then(resp => {
        expect(resp[0].deviceName).toEqual('Camera1');
      });
    });