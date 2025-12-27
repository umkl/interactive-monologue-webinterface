export function chatReducerFactory(chatBubbleMap: Map<string, ChatBubble>) {
  return function chatReducer(state: Chat, action: ActionButtonType) {
    const newChatBubble = chatBubbleMap.get("contact");

    switch (action) {
      default:
        return {
          chatBubbles: [newChatBubble, ...state.chatBubbles],
        };
    }
  };
}
