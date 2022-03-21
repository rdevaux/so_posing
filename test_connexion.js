const checkInternetConnected = require('check-internet-connected');

const config = {
  timeout: 5000, //timeout connecting to each server(A and AAAA), each try (default 5000)
  retries: 5,//number of retries to do before failing (default 5)
  domain: 'google.com'//the domain to check DNS record of
}

checkInternetConnected(config)
  .then(() => {
    console.log("Internet available");          
  }).catch((error) => {
    console.log("No internet", error);
  });
