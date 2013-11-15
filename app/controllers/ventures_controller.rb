class VenturesController < ApplicationController
  def index
    @ventures = Venture.all
    render json: @ventures
  end

  #def show
  #  @venture = Venture.find(params[:id])
  #  render json: @venture
  #end

  def show
    @venture = Venture.collection.aggregate({ 
      '$match' => {'idn_estagio.estagio' => { '$in' => ['Em obras', 'Em execução', 'Concluído', 'Em operação'] }},
      '$group' => { '_id' => {'subeixo' => '$idn_digs.Subeixo', 'data_balanco' => '$dat_ciclo'},
      'valor_total' => { '$sum'  => '$investimento_total' }, 
      'valor_total2' => {'$sum' => '$val_2011_2014'} } } )  
    render json: @venture
  end
end
