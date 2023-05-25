import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  // first attempt
  @State() showTooltip: boolean = false;
  // @Prop() opened: boolean = false;
  @Prop({ reflect: true }) tooltipText: string;

  // tooltipButton = document.querySelector('button');

  onRenderTooltip() {
    this.showTooltip = !this.showTooltip; //? true : false;
    // this.opened = !this.opened; //? true : false;
  }

  render() {
    let tooltipContent: boolean = null;
    if (this.showTooltip) {
      console.log('opened');
      tooltipContent = <span class="tooltip-text">{this.tooltipText}</span>;
    }

    return (
      <p>
        <slot>Let's test this new Tooltip!</slot>
        <button class="tooltip-icon" onClick={this.onRenderTooltip.bind(this)}>
          ?
        </button>
        {tooltipContent}
      </p>
    );
  }

  // improvement
  // @State() showTooltip = false;

  // @Prop() text: string;

  // onRenderTooltip() {
  //   this.showTooltip = !this.showTooltip;
  // }

  // render() {
  //   let tooltipContent = null;
  //   if (this.showTooltip) {
  //     tooltipContent = <span class="tooltip-text">{this.text}</span>;
  //   }

  //   return (
  //     <p>
  //       <slot>Let's test this new Tooltip!</slot>
  //       <button class="tooltip-icon" onClick={this.onRenderTooltip.bind(this)}>
  //         ?
  //       </button>
  //       {tooltipContent}
  //     </p>
  //   );
  // }
}
