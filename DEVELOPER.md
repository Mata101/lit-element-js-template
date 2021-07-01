## Writing Components

<h2 href="https://lit-element.polymer-project.org/guide/templates">Templates</h2>
<h3>Define and render a template Example</h3>
```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render() {
    return html`<p>template content</p>`;
  }
}
```