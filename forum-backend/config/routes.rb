Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :forum_categories, only: [:index]
  resources :forum_threads
  resources :forum_comments

  post "/login", to: "auth#login"
  get "/logout", to: "auth#logout"
  get "/comments_filter_thread/:forum_thread_id", to: "forum_comments#filter_thread"
  get "/threads_filter_user/:username", to: "forum_threads#filter_user"
  get "/comments_filter_user/:username", to: "forum_comments#filter_user"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
