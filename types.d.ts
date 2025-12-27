type Chat = {
  chatBubbles: ChatBubble[];
};

type ChatStore = {
  state: Chat;
  dispatch: React.Dispatch<ActionButtonType>;
};

type ChatBubble = {
  text: string;
  actionIds: string[];
};

type ActionButtonType = "chat" | "locale" | "link" | "download";
type ActionButton = {
  id: string;
  name: string;
  type: ActionButtonType;
  value: string;
};

// "chat:contact": {
//   "id": "chat:contact",
//   "name": "Contact",
//   "type": "chat",
//   "value": "contact"
// },
