class VenturesController < ApplicationController
  before_filter :store_cache

  def store_cache
    expires_in 1.month, public: true
  end

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
end
