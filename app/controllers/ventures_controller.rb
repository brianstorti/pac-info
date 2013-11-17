class VenturesController < ActionController::API
  before_filter :store_cache, :get_venture

  def index
    render json: @venture.investiments
  end

  def by_type
    render json: @venture.by_type
  end

  def by_status
    render json: @venture.by_status
  end

  def by_region
    render json: @venture.by_region(params[:region])
  end

  def store_cache
    expires_in 1.month, public: true
  end

  def get_venture
    category = case params[:category]
               when "transportes" then "Transportes"
               when "comunidade-cidada" then "Comunidade Cidadã"
               when "habitacao" then "Habitação"
               when "energia" then "Energia"
               when "agua-e-luz-para-todos" then "Água e Luz para todos"
               when "cidade-melhor" then "Cidade Melhor"
               else params[:category]
               end

    @venture = Venture.new(category)
  end
end
