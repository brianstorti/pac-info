class CurrencyFormatter
  attr_accessor :value

  def initialize(value)
    @value = value.to_i
  end

  def formatted
    return "0" if @value <= 0

    values = @value.to_s.reverse.scan(/.{1,3}/)
    sufix = case values.size
            when 2 then "K"
            when 3 then "Mi"
            when 4 then "Bi"
            when 5 then "Tri"
            else ""
            end

    "#{values.last.reverse} #{sufix}"
  end
end
