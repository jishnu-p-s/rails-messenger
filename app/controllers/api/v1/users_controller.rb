class Api::V1::UsersController < ApplicationController
  before_action :require_user , except: [:create]

  def index
    @users = User.all.select(:username, :id)
    render json: {users: @users}
  end
  
  def create

    if(params[:users][:password] != params[:users][:confirm])
      render status: :ok, json: {success: false, msg: ["passwords do not matchs"]}
      return
    end

    @user = User.new(username: params[:users][:username],password: params[:users][:password])
    if @user.save
      render status: :created, json: {success: true, msg: "User created"}
    else
      render status: :ok, json: {success: false, msg: @user.errors.full_messages}
    end
  end
  private

end
