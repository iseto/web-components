import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  @State() showTooltip = false;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  tooltipButton = document.querySelector('button');
  tooltipText = 'We built this before, now it is better!';

  onRenderTooltip() {
    this.showTooltip = !this.opened ? true : false;
    this.opened = !this.opened ? true : false;
  }

  render() {
    let tooltipContent = <span class="tooltip-text">{this.tooltipText}</span>;

    return [
      <p>
        <slot>Let's test this new Tooltip!</slot>
        <button class="tooltip-icon" onClick={this.onRenderTooltip.bind(this)}>
          ?
        </button>
        {tooltipContent}
      </p>,
    ];
  }
}
