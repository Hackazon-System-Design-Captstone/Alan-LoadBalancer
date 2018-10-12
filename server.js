require('newrelic');
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

let clusters = [
'18.144.19.8:1337',
'13.57.227.157:1338'
];

let counter = 0;
app.get('/api/related/:id', (req, res) => {
  console.log('counter => ', counter);
  counter++;
  let endpoint = counter % 2;
  axios.get('http://'+clusters[endpoint]+`/api/${req.params.id}`)
  .then(({data}) => {
    res.json(data);
    // console.log(data);
  })
  .catch((err) => {
    res.status(500).send(err);
    // console.log(err);
  })
});

app.get('loaderio-01ae0a7f9cd473f691e0bf083ce2486c.txt', (req, res) => {
  res.send('loaderio-01ae0a7f9cd473f691e0bf083ce2486c');
});


// Currently at port 3000
app.listen(port, () => {
  console.log(`Load balancer: Operational at port ${port}`);
})
