import fs from 'fs';
import App from './App';

let lines;
fs.readFileSync('./app/central.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  lines = data.split('\n');
});

const info = lines[0].split(' ');
const central = {
  ip: info[0],
  port: info[1],
};

const app = new App(central);

const PORT = 3333;

app.server.listen(PORT);
