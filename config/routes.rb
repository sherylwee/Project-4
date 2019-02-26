Rails.application.routes.draw do
  resources :items
  root 'onepage#index'
  devise_for :clients
  devise_for :students
  get '/profile' => 'onepage#profile', as: 'profile'
  resources :users
  resources :companies
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
