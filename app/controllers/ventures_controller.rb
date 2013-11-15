class VenturesController < ApplicationController
  def index
    render json: Venture.investiments_by(params[:category])
  end

  def by_type
    render json: Venture.investiments_by_type(params[:category])
  end

  def by_status
    render json: Venture.investiments_by_status(params[:category])
  end

  def by_region
    render json: Venture.investiments_by_region(params[:category], params[:region])
  end
end
