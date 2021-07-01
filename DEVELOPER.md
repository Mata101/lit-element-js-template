## Writing Components


### Define and render a [Templates](https://lit-element.polymer-project.org/guide/templates) Example</h3>
```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render() {
    return html"<p>template content</p>";
  }
}
```