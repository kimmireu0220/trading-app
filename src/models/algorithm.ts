class Algorithm {
  title: string;
  buyAlgorithm: string;
  buyTarget: string;
  sellAlgorithm: string;
  sellTarget: string;
  description: string;
  algorithmId: string;

  constructor(
    title: string,
    buyAlgorithm: string,
    buyTarget: string,
    sellAlgorithm: string,
    sellTarget: string,
    description: string,
    algorithmId: string
  ) {
    this.title = title;
    this.buyAlgorithm = buyAlgorithm;
    this.buyTarget = buyTarget;
    this.sellAlgorithm = sellAlgorithm;
    this.sellTarget = sellTarget;
    this.description = description;
    this.algorithmId = algorithmId;
  }
}

export default Algorithm;
