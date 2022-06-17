class Api::V1::UsersController < ApplicationController
  before_action :require_user, except: [:create]

  def index
    @users = User.where.not(username: @current_user.username).select(:username, :id)
    render json: { users: @users }
  end

  def show
    to_user = User.find_by(username: params[:username])
    if to_user
      chat_name = get_chat_name(to_user)
      chat = Group.find_by(title: chat_name)
      if chat
        render json: { success: true,group: chat.id }
      else
        new_chat = Group.new(title: chat_name, user_ids: [to_user.id,@current_user.id])
        if new_chat.save
          render status: :ok, json: {}
        else
          render json: {success: false, msg: "Error"}
        end
      end
    else
      render json: { success: false, msg: "User not found!" }
    end
  end

  def create
    if (params[:users][:password] != params[:users][:confirm])
      render status: :ok,
             json: {
               success: false,
               msg: ["passwords do not matchs"]
             }
      return
    end

    @user =
      User.new(
        username: params[:users][:username],
        password: params[:users][:password]
      )
    if @user.save
      render status: :created, json: { success: true, msg: "User created" }
    else
      render status: :ok,
             json: {
               success: false,
               msg: @user.errors.full_messages
             }
    end
  end

  private
  def get_chat_name(to_user)
    chatName = [@current_user.id, to_user.id].sort()
    chat_name = "chat_" + chatName[0].to_s + "_" + chatName[1].to_s
    return chat_name
  end
end
