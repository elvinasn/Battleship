class Ship {
  constructor(name, location = []) {
    this.name = name;
    this.location = location;
    this.hits = [];
  }

  hit(index) {
    this.hits.push(index);
  }

  isSunk() {
    return this.location.every((cell) => this.hits.includes(cell));
  }
}

export default Ship;
