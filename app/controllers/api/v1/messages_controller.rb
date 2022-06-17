class Api::V1::MessagesController < ApplicationController
  before_action :require_user

  def show
    chat = Group.find_by(id: params[:group_id])
    if chat
      send_all_messages(params[:group_id])
      render json: {success: true,messages: chat}
    else
      render json: {success: false}
    end
  end
  def index
    render status: :not_found, json: {success: false , msg: "Invalid route"}
  end
  def create
    message = current_user.messages.build(message_params)
    if message.save
      send_all_messages(params[:message][:group_id])
      render status: :created, json: { msg: "Message send",x: @result }
    else
      render json: {errors: message.errors.full_messages}
    end
  end

  private

  def message_params
    #params[:message][:group_id] =
    params.require(:message).permit(:body,:group_id)
  end

  def send_all_messages(chat_id)
    @messages = Message.where(group_id: chat_id) ||[]
    @result = []
    @messages.each do |message|
      messageObject = {
        username: message.user.username,
        id: message.id,
        body: message.body
      }
      @result << messageObject
    end
    ActionCable.server.broadcast("messages", { messages: @result , group_id: chat_id})
  end

end
