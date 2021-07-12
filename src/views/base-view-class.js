import { LitElement } from 'lit-element';
export class BaseView extends LitElement {

  // tell LitElement to render directly into the light DOM
  // you should see the CSS styles applied.
  createRenderRoot() {
    return this;
  }
}