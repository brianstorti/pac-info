class TransportsController < ApplicationController
  def investiments
    render json: Transport.investiments
  end
end
