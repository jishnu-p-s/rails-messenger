class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  skip_forgery_protection 


  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def require_user
    if !logged_in?
      render status: :not_found, json: {msg: "Not logged in"}
    end
  end
end