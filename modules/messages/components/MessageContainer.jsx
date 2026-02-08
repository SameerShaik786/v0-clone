import MessageCard from "./MessageCard"
import { Spinner } from "@/components/ui/spinner"
import { ThinkingMessage } from "./MessageCard"

const MessageContainer = ({ messages, isPending, getCurrentFragment, isProcessing }) => {
    if (isPending && (!messages || messages.length === 0)) {
        return (
            <div className="flex-1 min-h-0 overflow-y-auto flex items-center justify-center">
                <Spinner className="h-6 w-6" />
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return null
    }

    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1;
                return (
                    <MessageCard
                        message={message}
                        isPending={isPending}
                        key={message.id}
                        getCurrentFragment={getCurrentFragment}
                        isLastMessage={isLastMessage}
                        isProcessing={isProcessing}
                    />
                )
            })}
            {/* Show ThinkingMessage when processing Inngest request */}
            {isProcessing && (
                <div className="p-3">
                    <ThinkingMessage />
                </div>
            )}
        </div>
    )
}

export default MessageContainer