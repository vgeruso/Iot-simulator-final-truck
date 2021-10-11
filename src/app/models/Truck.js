import fs from 'fs';

export default class Truck {
  constructor(id) {
    this.id = id;
    this.containers = [];
    this.isLivre = true;
  }

  setContainers() {
    let lines;
    fs.readFileSync('../containers.txt', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      lines = data.split('\n');
    });

    lines.forEach((line) => {
      const info = line.split(' ');
      const container = {
        id: info[0],
        ip: info[1],
        port: info[2],
      };

      this.containers.push(container);
    });
  }

  getContainer(idContainer) {
    let container;
    this.containers.forEach((c) => {
      if (c.id === idContainer) {
        container = c;
      }
    });

    return container;
  }

  setIsLiver(isLivre) {
    this.isLivre = isLivre;
  }

  getIsLivre() {
    return this.isLivre;
  }

  getId() {
    return this.id;
  }

  getTruck() {
    return {
      id: this.id,
      isLivre: this.isLivre,
    };
  }
}
