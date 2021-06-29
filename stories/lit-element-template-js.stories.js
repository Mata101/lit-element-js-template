import { html } from 'lit-html';
import '../src/lit-element-template-js.js';

export default {
  title: 'LitElementTemplateJs',
  component: 'lit-element-template-js',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <lit-element-template-js
      style="--lit-element-template-js-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </lit-element-template-js>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
