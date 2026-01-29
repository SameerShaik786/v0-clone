import MessageCard from "./MessageCard"

const MessageContainer = ({ messages, isPending,getCurrentFragment }) => {
    if(messages.length === 0){
        return null
    }
    return (
        <div className="h-[62vh] overflow-y-auto">
            {   messages.map((message) => {
                return (
                    <MessageCard message={message} isPending={isPending} key={message.id} getCurrentFragment={getCurrentFragment}/>
                )
            })   
            }
            {   messages.map((message) => {
                return (
                    <MessageCard message={message} isPending={isPending} key={message.id}/>
                )
            })   
            }
            {   messages.map((message) => {
                return (
                    <MessageCard message={message} isPending={isPending} key={message.id}/>
                )
            })   
            }
        </div>
    )
}

export default MessageContainer