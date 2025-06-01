export class Socket {
  constructor(url) {
    this.url = url;
  }

  open() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
    };
    this.socket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
    this.socket.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };
  }

  send(message) {
    if (this.socket !== null) {
      this.socket.send(message);
    }
  }
}
