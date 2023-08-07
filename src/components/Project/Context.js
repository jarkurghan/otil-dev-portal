import { createContext, useState } from "react";

export const Message = createContext();

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(false);
  return (
    <Message.Provider value={[message, setMessage]}>
      {children}
    </Message.Provider>
  );
};

export default MessageProvider