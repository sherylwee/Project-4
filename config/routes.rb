Rails.application.routes.draw do
  root 'onepage#index'
  devise_for :clients
  devise_for :students
  
  resources :users
  resources :companies
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
