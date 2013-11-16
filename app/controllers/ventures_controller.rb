class VenturesController < ApplicationController
  before_filter :store_cache, :get_category_name

  def index
    render json: Venture.new(params[:category]).investiments
  end

  def by_type
    render json: Venture.new(params[:category]).by_type
  end

  def by_status
    render json: Venture.new(params[:category]).by_status
  end

  def by_region
    render json: Venture.new(params[:category]).by_region(params[:region])
  end

  def store_cache
    expires_in 1.month, public: true
  end

  def get_category_name
    params[:category] = case params[:category]
                        when "transportes" then "Transportes"
                        when "comunidade-cidada" then "Comunidade Cidadã"
                        when "habitacao" then "Habitação"
                        when "energia" then "Energia"
                        when "agua-e-luz-para-todos" then "Água e Luz para todos"
                        when "cidade-melhor" then "Cidade Melhor"
                        else params[:category]
                        end
  end
end
