class Lamport {
  static globalCounter = 0;
  static syncCounter = (remoteCounter: number) => {
    Lamport.globalCounter = Math.max(Lamport.globalCounter, remoteCounter) + 1;
  };
  readonly counter: number;
  constructor() {
    Lamport.globalCounter++;
    this.counter = Lamport.globalCounter;
  }
}

export default Lamport;
