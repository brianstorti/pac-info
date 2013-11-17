PacInfo::Application.routes.draw do
  resources :ventures do
    collection do
      get ':category' => 'ventures#index'
      get ':category/by_type' => 'ventures#by_type'
      get ':category/by_status' => 'ventures#by_status'
      get ':category/by_region/:region' => 'ventures#by_region'
    end
  end
end
