Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => "/cable"

  root "pages#index"
  namespace :api do
    namespace :v1 do
      get "/users", to: "users#index"
      get "/users/:username", to: "users#show"
      resource :users, only: %i[create]
      get "/messages", to: "messages#index"
      get '/messages/:group_id',to: 'messages#show'
      resource :messages, only: %i[create]
      resource :sessions, only: %i[show create destroy]
    end
  end
  get "*path", to: "pages#index"
end
