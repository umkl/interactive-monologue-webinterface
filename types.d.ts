type Chat = {
  chatBubbles: ChatBubble[];
};

type ChatStore = {
  state: Chat;
  dispatch: React.Dispatch<ActionButtonEvent>;
};

type ChatBubble = {
  id: string;
  text: string;
  actions: ActionButton[];
  actionIds: string[];
};

type ActionButtonType = "chat" | "locale" | "link" | "download";
type ActionButton = {
  id: string;
  label: string;
  event: ActionButtonEvent;
};
type ActionButtonEvent = {
  type: ActionButtonType;
  value: string;
};

// "chat:contact": {
//   "id": "chat:contact",
//   "name": "Contact",
//   "type": "chat",
//   "value": "contact"
// },
