## Writing Components


### Define and render a [Templates](https://lit-element.polymer-project.org/guide/templates) Example
To define a template for a LitElement component, write a render function for your element class:
```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render() {
    return html"<p>template content</p>";
  }
}
```

### Add [Styles](https://lit-element.polymer-project.org/guide/styles) to your Component example
For optimal performance, define scoped styles in a static styles property.

Define styles in a tagged template literal, using the css tag function:

```
import { LitElement, css, html } from 'r5ehhjhb  lit-element';

class MyElement extends LitElement {
  static get styles() {
    return css"
      div { color: red; }
    ";
  }
  render() { 
    return html"
      <div>I'm styled!</div> 
    ";
  }
}
```


### Declare [Properties](https://lit-element.polymer-project.org/guide/properties) Example
Declare your element’s properties using a static properties field, or using decorators:

```
static get properties() {
  return { 
    propertyName: options
  };
}
```

### Where to add your [Event](https://lit-element.polymer-project.org/guide/events) listeners Example
You need to add event listeners in a method that is guaranteed to fire before the event occurs. However, for optimal loading performance, you should add your event listener as late as possible.

```
render() {
  return html`<button @click="${this._handleClick}">`;
}

```

### [Lifecycle](https://lit-element.polymer-project.org/guide/lifecycle)

LitElement-based components update asynchronously in response to observed property changes. Property changes are batched—if more properties change after an update is requested, but before the update starts, all of the changes are captured in the same update.

At a high level, the update lifecycle is:

A property is set.
Check whether an update is needed. If an update is needed, request one.
Perform the update:
Process properties and attributes.
Render the element.
Resolve a Promise, indicating that the update is complete.
LitElement and the browser event loop
The browser executes JavaScript code by processing a queue of tasks in the event loop. In each iteration of the event loop, the browser takes a task from the queue and runs it to completion.

When the task completes, before taking the next task from the queue, the browser allocates time to perform work from other sources—including DOM updates, user interactions, and the microtask queue.

By default, LitElement updates are requested asynchronously, and queued as microtasks. This means that Step 3 above (Perform the update) is executed at the end of the next iteration of the event loop.

You can change this behavior so that Step 3 awaits a Promise before performing the update. See performUpdate for more information.

For a more detailed explanation of the browser event loop, see Jake Archibald’s article.

Lifecycle callbacks
LitElement also inherits the default lifecycle callbacks from the Web Component standard:

connectedCallback: Invoked when a component is added to the document’s DOM.
disconnectedCallback: Invoked when a component is removed from the document’s DOM.
adoptedCallback: Invoked when a component is moved to a new document.
attributeChangedCallback: Invoked when component attribute changes.

All lifecycle methods need to call the super method.

Example:
```
connectedCallback() {
  super.connectedCallback()

  console.log('connected')
}
```

### Using [decorators](https://lit-element.polymer-project.org/guide/decorators)

Decorators are special expressions that can alter the behavior of class, class method, and class field declarations. LitElement supplies a set of decorators that reduce the amount of boilerplate code you need to write when defining a component.

For example, the @customElement and @property decorators make a basic element definition more compact:

```
import {LitElement, html, customElement, property} from 'lit-element';

@customElement('my-element')
class MyElement extends LitElement {

 // Declare observed properties
 @property()
 adjective = 'awesome';

 // Define the element's template
 render() {
   return html`<p>your ${this.adjective} template here</p>`;
 }
}
```



## Tools

### [Publish an element](https://lit-element.polymer-project.org/guide/publish)

We recommend publishing JavaScript modules in standard ES2017. If you’re writing your element in standard ES2017, you don’t need to transpile for publication. If you’re using TypeScript, or ES2017+ features such as decorators or class fields, you will need to transpile your element for publication.

Publishing to npm
To publish your component to npm, [see the instructions on contributing npm packages.](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

Your package.json configuration should have both the main and module fields:

package.json
```
{
  "main": "my-element.js",
  "module": "my-element.js"
}
```

Transpiling with TypeScript
When compiling your code from TypeScript to JavaScript, we recommend targeting ES2017 with Node.js module resolution.

The following JSON sample is a partial tsconfig.json that uses recommended options for targeting ES2017:
```
  "compilerOptions": {
    "target": "es2017",
    "module": "es2015",
    "moduleResolution": "node",
    "lib": ["es2017", "dom"],
    "experimentalDecorators": true
  }
```

See the [tsconfig.json documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for more information.

Transpiling with Babel
To transpile a LitElement component that uses proposed JavaScript features, use Babel.

Install Babel and the Babel plugins you need. For example:

npm install --save-dev @babel/core
npm install --save-dev @babel/plugin-proposal-class-properties
npm install --save-dev @babel/plugin-proposal-decorators
Configure Babel. For example:

babel.config.js
```
const plugins = [
  '@babel/plugin-proposal-class-properties',
  ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true } ],
];

module.exports = { plugins };
```


### [Use a component](https://lit-element.polymer-project.org/guide/use)

<b>Use a LitElement component</b>
This is a general guide to using third-party LitElement components. Refer to a component’s README or other documentation for specific details.

To use a LitElement component in your code:

1. From your project folder, install the component from npm.

```
npm install some-package-name
```

2. Import the component.

In a JavaScript module:
```
import 'some-package-name';
```
In an HTML page:
```
<script type="module">
import './path-to/some-package-name/some-component.js';
</script>
```
Or:
```
<script type="module" src="./path-to/some-package-name/some-component.js"></script>
```
3. Add the component to your application or component:
```
<some-component></some-component>
```


## Resources

1. [Community](https://lit-element.polymer-project.org/guide/community)
2. [lit-html Guides](https://lit-html.polymer-project.org/guide)
3. [Tutorial Videos](https://www.youtube.com/playlist?list=PLZPRETGzebVYjLUnUKzo6yffESOFpKTXa)
4. [LitElement Material Components](https://github.com/material-components/material-components-web-components)
5. [Lit Element Tutorials](https://vaadin.com/learn/tutorials/lit-element/)