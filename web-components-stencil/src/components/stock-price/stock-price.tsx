import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  @State() fetchedPrice: number;

  onFetchStockSubmit(event: Event) {
    event.preventDefault();
    console.log('submitted!');
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo')
      .then(res => res.json())
      .then(parsedRes => {
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(error => console.log(error));
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockSubmit.bind(this)}>
        <div>
          <input type="text" id="stock-symbol" />
          <button type="submit">Fetch</button>
        </div>
      </form>,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>,
    ];
  }
}
