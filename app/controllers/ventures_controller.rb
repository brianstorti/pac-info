class VenturesController < ApplicationController
  def investiments
    render json: Venture.investiments_by(params[:category])
  end

  def investiments_by_type
    render json: Venture.investiments_by_type_in(params[:category])
  end

  def investiments_by_status
    render json: Venture.investiments_by_status(params[:category])
  end
end
