class Api::V1::MessagesController < ApplicationController
  before_action :require_user 

  def index
    send_all_messages
    render status: :ok, json: {}
  end

  def create
    message = current_user.messages.build(message_params)
    if message.save
      send_all_messages
      render status: :created, json: {msg: "Message send"}
    end
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end

  def send_all_messages
    @messages = Message.all
    @result=[]
    @messages.each do |message|
      messageObject={username: message.user.username, id: message.id, body: message.body}
      @result << messageObject
    end
    ActionCable.server.broadcast('messages', { messages: @result })
  end

end
