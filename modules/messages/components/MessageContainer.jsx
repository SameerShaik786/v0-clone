import MessageCard from "./MessageCard"
import { Spinner } from "@/components/ui/spinner"

const MessageContainer = ({ messages, isPending, getCurrentFragment }) => {
    if (isPending && (!messages || messages.length === 0)) {
        return (
            <div className="h-[62vh] overflow-y-auto flex items-center justify-center">
                <Spinner className="h-6 w-6" />
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return null
    }

    return (
        <div className="h-[62vh] overflow-y-auto">
            {messages.map((message) => {
                return (
                    <MessageCard message={message} isPending={isPending} key={message.id} getCurrentFragment={getCurrentFragment} />
                )
            })}
            {isPending && messages.length > 0 && (
                <div className="flex items-center justify-center p-4">
                    <Spinner className="h-5 w-5" />
                </div>
            )}
        </div>
    )
}

export default MessageContainer