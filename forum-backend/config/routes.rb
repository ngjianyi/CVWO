Rails.application.routes.draw do
  resources :forum_comments
  resources :users
  resources :forum_threads
  get "/thread_comments/:forum_thread_id", to: "forum_comments#thread_comments"
  post "/forum_comments", to: "forum_comments#create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
