class VenturesController < ApplicationController
  def investiments
    render json: Venture.investiments_by(params[:category])
  end
end
