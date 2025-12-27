export function chatReducerFactory(chatBubbleMap: Map<string, ChatBubble>) {
  return function chatReducer(state: Chat, action: ActionButtonEvent) {
    const actionvalue = action.value;
    const newChatBubble = chatBubbleMap.get(actionvalue);
    console.log("action value:", actionvalue);
    console.log("Reducer action:", newChatBubble);
    switch (action) {
      default:
        return {
          chatBubbles: [...state.chatBubbles, newChatBubble],
        };
    }
  };
}
