class Region
  STATES = {
    "Norte" => ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
    "Nordeste" => ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
    "Centro-Oeste" => ["DF", "GO", "MG", "MS"],
    "Sudeste" => ["ES", "MG", "RJ", "SP"],
    "Sul" => ["SC", "PR", "RS"]
  }

  def self.states_in(region)
    STATES[region]
  end
end
