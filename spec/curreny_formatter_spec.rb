require_relative "../app/models/currency_formatter"

describe CurrencyFormatter do
  it 'ignores cents' do
    CurrencyFormatter.new(10.5).value.should == 10
  end

  it 'returns 0 when there is no value' do
    formatted_value  = CurrencyFormatter.new(0).formatted
    formatted_value.should == "0"
  end

  it 'formats thousands with K sufix' do
    formatted_value = CurrencyFormatter.new(10_000).formatted
    formatted_value.should == "10 K"
  end

  it 'formats millions with Mi sufix' do
    formatted_value = CurrencyFormatter.new(10_000_000).formatted
    formatted_value.should == "10 Mi"
  end

  it 'formats billions with Bi sufix' do
    formatted_value = CurrencyFormatter.new(20_000_000_000).formatted
    formatted_value.should == "20 Bi"
  end

  it 'formats trillions with Tri sufix' do
    formatted_value = CurrencyFormatter.new(30_000_000_000_000).formatted
    formatted_value.should == "30 Tri"
  end
end
