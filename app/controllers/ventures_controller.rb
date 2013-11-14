class VenturesController < ApplicationController
  def index
    @ventures = Venture.all
    render json: @ventures
  end

  def show
    @venture = Venture.find(params[:id])
    render json: @venture
  end
end
