class DailyData {
  days: string[];
  opens: string[];
  highs: string[];
  lows: string[];
  closes: string[];
  volumes: string[];

  constructor(
    days: string[],
    opens: string[],
    highs: string[],
    lows: string[],
    closes: string[],
    volumes: string[]
  ) {
    this.days = days;
    this.opens = opens;
    this.highs = highs;
    this.lows = lows;
    this.closes = closes;
    this.volumes = volumes;
  }
}

export default DailyData;
