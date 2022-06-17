class Api::V1::SessionsController < ApplicationController
  before_action :require_user, except: [:create]
  def show
    if current_user
      render status: :ok, json: { username: current_user.username }
    else
      render status: :not_found, json: { success: false }
    end
  end

  def create
    user = User.find_by(username: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      # flash[:success] = "You have successfully logged in"
      # redirect_to root_path
      render json: { session: session, success: true }
    else
      render json: { success: false, msg: "Invalid username/password" }
    end
  end
  def destroy
    session[:user_id] = nil
  end

  private

  def login_params
    params.require(:session).permit(:username, :password)
  end
end
