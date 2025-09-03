import type {
  ChatMessageProps,
  Message,
} from '@workspace/ui/components/chat-message';
import { ChatMessage } from '@workspace/ui/components/chat-message';
import { TypingIndicator } from '@workspace/ui/components/typing-indicator';

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

type MessageListProps = {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  messageOptions?:
    | AdditionalMessageOptions
    | ((message: Message) => AdditionalMessageOptions);
};

export function MessageList({
  messages,
  showTimeStamps = true,
  isTyping = false,
  messageOptions,
}: MessageListProps) {
  return (
    <div className="space-y-4 overflow-visible">
      {messages.map((message, index) => {
        const additionalOptions =
          typeof messageOptions === 'function'
            ? messageOptions(message)
            : messageOptions;

        return (
          <ChatMessage
            key={index}
            showTimeStamp={showTimeStamps}
            {...message}
            {...additionalOptions}
          />
        );
      })}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
