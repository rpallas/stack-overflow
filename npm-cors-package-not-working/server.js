var Express = require('express');
var cors = require('cors');

// Initialize Express
const app = new Express();

app.use(cors());
app.listen(8080, () => {
  console.log(`Server started on port: ${8080}`);
});

app.post('/v1/signup', (req, res) => {
  console.log(`signup called with: username=${req.body.username}\npassword=${req.body.password}`);
  res.send(req.body);
});
