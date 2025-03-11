"use client";
import { io } from "socket.io-client";

class SocketManager {
  constructor() {
    this.instance = null;
    this.subscriptions = new Map();
    this.pendingJoins = new Set();
    this.authToken = null;
  }

  initialize(token) {
    if (this.instance && this.authToken === token) return;
    this.authToken = token;

    if (this.instance) this.disconnect();

    this.instance = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    // Connection lifecycle handlers
    this.instance.on("connect", this.handleConnect.bind(this));
    this.instance.on("disconnect", this.handleDisconnect.bind(this));
    this.instance.on("reconnect", this.handleReconnect.bind(this));
  }

  handleConnect() {
    console.log("Socket connected");
    this.pendingJoins.forEach((room) => this.joinRoom(room));
    this.pendingJoins.clear();
  }

  handleDisconnect(reason) {
    console.log("Socket disconnected:", reason);
    if (reason === "io server disconnect") {
      this.instance.connect();
    }
  }

  handleReconnect(attempt) {
    console.log(`Reconnected after ${attempt} attempts`);
  }

  joinRoom(room) {
    if (!this.instance?.connected) {
      this.pendingJoins.add(room);
      return;
    }
    this.instance.emit("join_room", room);
  }

  leaveRoom(room) {
    this.pendingJoins.delete(room);
    if (this.instance?.connected) {
      this.instance.emit("leave_room", room);
    }
  }

  subscribe(event, callback) {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set());
      // Add error handling
      this.instance?.on(event, (...args) => {
        try {
          this.subscriptions.get(event).forEach((cb) => cb(...args));
        } catch (err) {
          console.error(`Error in ${event} handler:`, err);
        }
      });
    }
    this.subscriptions.get(event).add(callback);
    return () => this.unsubscribe(event, callback);
  }

  // Add connection state tracking
  get isConnected() {
    return this.instance?.connected || false;
  }

  unsubscribe(event, callback) {
    this.subscriptions.get(event)?.delete(callback);
  }

  emit(event, data) {
    if (this.instance?.connected) {
      this.instance.emit(event, data);
    }
  }

  disconnect() {
    if (this.instance) {
      this.instance.removeAllListeners();
      this.instance.disconnect();
      this.instance = null;
      this.subscriptions.clear();
      this.pendingJoins.clear();
    }
  }
}

export const socketManager = new SocketManager();
