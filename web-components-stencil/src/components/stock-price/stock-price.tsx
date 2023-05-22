import { Component, Element, State, h } from '@stencil/core';

import { AV_API_KEY } from '../../global';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  @Element() el: HTMLElement;
  @State() fetchedPrice: number;

  onFetchStockSubmit(event: Event) {
    event.preventDefault();
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    const stockSymbol = this.stockInput.value;
    console.log('submitted!');
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
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
          <input type="text" id="stock-symbol" ref={el => (this.stockInput = el)} />
          <button type="submit">Fetch</button>
        </div>
      </form>,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>,
    ];
  }
}
