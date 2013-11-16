class Venture
  include Mongoid::Document

  def initialize(category)
    @category = category
  end

  def investiments
    collection.aggregate(
      { '$match' => { 'idn_estagio.estagio' => { '$in' => ['Em obras', 'Em execução', 'Concluído', 'Em operação'] },
                      'idn_digs.Subeixo' => @category }},
                      { '$group' => { '_id' => { 'subeixo' => '$idn_digs.Subeixo', 'data_balanco' => '$dat_ciclo' },
                                      'investimento_total' => { '$sum'  => '$investimento_total' },
                                      'val_2011_2014' => { '$sum' => '$val_2011_2014' }}})
  end

  def by_type
    collection.aggregate(
      { '$match' => { 'idn_digs.Subeixo' => @category }},
      { '$group' => { '_id' => '$idn_digs.Tipo',
                      'investimento_total' => { '$sum'  => '$investimento_total' },
                      'val_2011_2014' => { '$sum' => '$val_2011_2014' }}})
  end

  def by_status
    collection.aggregate(
      { '$match' => { 'idn_digs.Subeixo' => @category }},
      { '$group' => { '_id' => '$idn_estagio.estagio',
                      'total' => { '$sum' => 1 }}})
  end

  def by_region(region)
    collection.aggregate(
      { '$match' => { 'idn_digs.Subeixo' => @category,
                      'sig_uf' => { '$in' => Region.states_in(region) }}},
      { '$group' => { '_id' => '$sig_uf',
                      'investimento_total' => { '$sum' => '$investimento_total' },
                      'val_2011_2014' => { '$sum' => '$val_2011_2014' }}})
  end
end
