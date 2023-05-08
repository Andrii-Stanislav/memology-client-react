import { useState, useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "../constants/localStorage";

import { socket } from "./ws";
import { WS_KEYS } from "./constants";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  const sendMessage = async (key: WS_KEYS, message: object) => {
    socket.emit(key, JSON.stringify({ ...message, accessToken }));
  };

  return { isConnected, socket, sendMessage };
};

export default useSocket;
