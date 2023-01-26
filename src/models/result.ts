type Trade = { day: Date; price: string };

class Result {
  id: number;
  buy: Trade;
  profit: string;
  sell: Trade;

  constructor(id: number, buy: Trade, profit: string, sell: Trade) {
    this.id = id;
    this.buy = buy;
    this.profit = profit;
    this.sell = sell;
  }
}

export default Result;
