import net from 'net';

import Truck from './app/models/Truck';

export default class App {
  constructor(central) {
    this.truck = new Truck(1);
    this.central = net.createConnection(central);
    this.truck.setContainers();
    this.central.write(`LIVRE ${this.truck.getId()}`);

    this.server = net.createServer((con) => {
      con.on('data', (data) => {
        const msg = data.toString();
        console.log(msg);
        const idContainer = Number(msg.split(' ')[1]);
        const cont = this.truck.getContainer(idContainer);
        this.container = net.createConnection({
          ip: cont.ip,
          port: cont.port,
        });

        const math = Math.floor(Math.random() * (20 - 5)) + 5;
        const sec = Number(`${math}000`);
        setTimeout(() => {
          this.container.write(`CHEGUEI_CONTATINER ${this.truck.getId()}`);
          setTimeout(() => {
            this.central.write(`COLETA_FINALIZADA ${this.truck.getId()}`);
            this.central.write(`LIVRE ${this.truck.getId()}`);
          }, sec);
        }, sec);
      });
    });
  }
}
