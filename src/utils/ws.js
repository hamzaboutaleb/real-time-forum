export const WS_EVENTS = Object.freeze({
  WS_ERROR: "error",
  WS_CLOSE: "close",
  WS_OPEN: "open",
});

export class Socket {
  #ws = null;
  #isOpen = false;
  constructor(ws) {
    this.#ws = ws;
    this.#isOpen = true;
  }

  sendJson(data) {
    this.#ws.send(JSON.stringify(data));
  }
  get isOpen() {
    return this.#isOpen;
  }

  close(...args) {
    this.#isOpen = false;
    this.#ws.close(...args);
  }
}

export class WS {
  #ws = null;
  #socket = null;
  #eventsHandlers = {};
  #url = "";
  #token = "";
  #connected = false;
  constructor(url) {
    this.#url = url;
  }

  on(event, handler) {
    this.#eventsHandlers[event] = handler;
  }

  emit(event, data) {
    if (!this.#connected) {
      console.warn("Not connected to server");
      return;
    }
    console.log("Emitting event", event);
    this.#socket.sendJson({ type: event, data: data });
  }

  connect(token) {
    if (this.#connected) return;
    this.#connected = true;
    console.log("Connecting to server");
    this.#token = token;
    this.#ws = new WebSocket(`${this.#url}?token=${this.#token}`);
    this.#initEvents(this.#ws);
  }

  close() {
    if (this.#socket) {
      this.#connected = false;
      this.#socket.close(1000);
    }
  }
  #initEvents(ws) {
    ws.addEventListener("open", () => {
      this.#socket = new Socket(ws);
      const handler = this.#eventsHandlers[WS_EVENTS.WS_OPEN];
      if (handler) handler(this.#socket);
      else {
        console.log("Connected to server open fn");
      }
    });

    ws.addEventListener("error", (error) => {
      const handler = this.#eventsHandlers[WS_EVENTS.WS_ERROR];
      this.#connected = false;
      if (handler) handler(error);
      else console.error("Error connecting to server", error);
    });

    ws.addEventListener("close", () => {
      console.log("Disconnected from server");
      const handler = this.#eventsHandlers[WS_EVENTS.WS_CLOSE];
      if (handler) {
        handler();
      }
      this.#connected = false;
      this.#socket.close();
    });

    ws.addEventListener("message", (message) => {
      const { type, ...data } = JSON.parse(message.data);
      if (this.#eventsHandlers[type] && this.#socket.isOpen) {
        this.#eventsHandlers[type](data.data, this.#socket);
      } else {
        console.warn(`No handler for event ${type}`);
      }
    });
  }
}
