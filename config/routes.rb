Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'

  root 'pages#index'  
  namespace :api do
    namespace :v1 do
      get '/users', to: 'users#index'
      resource :users, only: %i[show create]
      get '/messages', to: 'messages#index'
      resource :messages, only: %i[show create]
      resource :sessions, only: %i[show create destroy]
    end
  end
  get '*path' , to: 'pages#index'
end