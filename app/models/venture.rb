class Venture
  include Mongoid::Document

  DATE_LAST_CYCLE = '31/08/2013'

  def initialize(category)
    @category = category
  end

  def investiments
    result = collection.aggregate(
      { '$match' => { 'idn_estagio.estagio' => { '$in' => ['Em obras', 'Em execução', 'Concluído', 'Em operação'] },
                      'idn_digs.Subeixo' => @category }},
      { '$group' => { '_id' => { 'subeixo' => '$idn_digs.Subeixo', 'data_balanco' => '$dat_ciclo' },
                      'investimento_total' => { '$sum'  => '$investimento_total' },
                      'val_2011_2014' => { '$sum' => '$val_2011_2014' }}})

    result = merge_balances(result)
    result = convert_date(result)
    result = result.sort_by { |r| r["formatted_date"] }.reverse
    format_currency(result)
  end

  def by_type
    result = collection.aggregate(
      { '$match' => { 'idn_digs.Subeixo' => @category,
                      'dat_ciclo' => DATE_LAST_CYCLE }},
      { '$group' => { '_id' => '$idn_digs.Tipo',
                      'investimento_total' => { '$sum'  => '$investimento_total' },
                      'val_2011_2014' => { '$sum' => '$val_2011_2014' },
                      'quantidade_empreendimentos' => { '$sum' => 1 }}})

    format_currency(result)
  end

  def by_status
    collection.aggregate(
      { '$match' => { 'idn_digs.Subeixo' => @category,
                      'dat_ciclo' => DATE_LAST_CYCLE }},
      { '$group' => { '_id' => '$idn_estagio.estagio',
                      'total' => { '$sum' => 1 }}},
      { '$sort' => { 'total' => 1 }})
  end

  def by_region(region)
    result = collection.aggregate(
      { '$match' => { 'idn_digs.Subeixo' => @category,
                      'sig_uf' => { '$in' => Region.states_in(region) },
                      'dat_ciclo' => DATE_LAST_CYCLE }},
      { '$group' => { '_id' => '$sig_uf',
                      'investimento_total' => { '$sum' => '$investimento_total' },
                      'val_2011_2014' => { '$sum' => '$val_2011_2014' }}})

    format_currency(result)
  end

  def convert_date(results)
    formatted_result = []

    results.each do |result|
      date = result["_id"]["data_balanco"]
      day, month, year = date.split("/").map(&:to_i)
      result = result.merge("formatted_date" => Date.new(year, month, day))
      formatted_result << result
    end

    formatted_result
  end
  private :convert_date

  def merge_balances(results)
    balance_to_be_deleted = results.detect { |element| element["_id"]["data_balanco"] == "30/06/2012"}
    if (balance_to_be_deleted)
        balance = results.detect { |element| element["_id"]["data_balanco"] == "30/04/2012"}
        balance.merge!('investimento_total' => balance_to_be_deleted["investimento_total"] + balance["investimento_total"])
        balance.merge!('val_2011_2014' => balance_to_be_deleted["val_2011_2014"] + balance["val_2011_2014"])
    end

    results.delete(balance_to_be_deleted)
    results
  end
  private :merge_balances

  def format_currency(results)
    formatted_results = []
    results.each do |result|
      value = result["investimento_total"] + result["val_2011_2014"]
      result = result.merge(label: CurrencyFormatter.new(value).formatted,
                            valor_total: value)
      result.delete("investimento_total")
      result.delete("val_2011_2014")
      formatted_results << result
    end

    formatted_results
  end
  private :format_currency
end
