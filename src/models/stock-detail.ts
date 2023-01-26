class StockDetail {
  Beta: string;
  EBITDA: string;
  PEGRatio: string;
  BookValue: string;
  ForwardPE: string;
  TrailingPE: string;
  RevenueTTM: string;
  EVToEBITDA: string;
  EVToRevenue: string;
  ProfitMargin: string;
  DividendDate: string;
  FiscalYearEnd: string;
  DilutedEPSTTM: string;
  DividendYield: string;
  ExDividendDate: string;
  GrossProfitTTM: string;
  PriceToBookRatio: string;
  SharesOutstanding: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenuePerShareTTM: string;
  OperatingMarginTTM: string;
  MarketCapitalization: string;
  PriceToSalesRatioTTM: string;
  QuarterlyRevenueGrowthYOY: string;
  QuarterlyEarningsGrowthYOY: string;

  constructor(
    Beta: string,
    EBITDA: string,
    PEGRatio: string,
    BookValue: string,
    ForwardPE: string,
    TrailingPE: string,
    RevenueTTM: string,
    EVToEBITDA: string,
    EVToRevenue: string,
    ProfitMargin: string,
    DividendDate: string,
    FiscalYearEnd: string,
    DilutedEPSTTM: string,
    DividendYield: string,
    ExDividendDate: string,
    GrossProfitTTM: string,
    PriceToBookRatio: string,
    SharesOutstanding: string,
    ReturnOnAssetsTTM: string,
    ReturnOnEquityTTM: string,
    RevenuePerShareTTM: string,
    OperatingMarginTTM: string,
    MarketCapitalization: string,
    PriceToSalesRatioTTM: string,
    QuarterlyRevenueGrowthYOY: string,
    QuarterlyEarningsGrowthYOY: string
  ) {
    this.Beta = Beta;
    this.EBITDA = EBITDA;
    this.PEGRatio = PEGRatio;
    this.BookValue = BookValue;
    this.ForwardPE = ForwardPE;
    this.TrailingPE = TrailingPE;
    this.RevenueTTM = RevenueTTM;
    this.EVToEBITDA = EVToEBITDA;
    this.EVToRevenue = EVToRevenue;
    this.ProfitMargin = ProfitMargin;
    this.DividendDate = DividendDate;
    this.FiscalYearEnd = FiscalYearEnd;
    this.DilutedEPSTTM = DilutedEPSTTM;
    this.DividendYield = DividendYield;
    this.ExDividendDate = ExDividendDate;
    this.GrossProfitTTM = GrossProfitTTM;
    this.PriceToBookRatio = PriceToBookRatio;
    this.SharesOutstanding = SharesOutstanding;
    this.ReturnOnAssetsTTM = ReturnOnAssetsTTM;
    this.ReturnOnEquityTTM = ReturnOnEquityTTM;
    this.RevenuePerShareTTM = RevenuePerShareTTM;
    this.OperatingMarginTTM = OperatingMarginTTM;
    this.MarketCapitalization = MarketCapitalization;
    this.PriceToSalesRatioTTM = PriceToSalesRatioTTM;
    this.QuarterlyRevenueGrowthYOY = QuarterlyRevenueGrowthYOY;
    this.QuarterlyEarningsGrowthYOY = QuarterlyEarningsGrowthYOY;
  }
}

export default StockDetail;
