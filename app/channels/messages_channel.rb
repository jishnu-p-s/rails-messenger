class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
    @messages = Message.all
    @result=[]
    @messages.each do |message|
      messageObject={username: message.user.username, id: message.id, body: message.body}
      @result << messageObject
    end
    ActionCable.server.broadcast('messages', { messages: @result })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
