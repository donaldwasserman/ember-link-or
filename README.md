# ember-link-or

This draft addon is an example of how to accomplish having a link for large
screens that renders a component, but on smaller screens links to a seperate route.

## Usage

This addon provides a `{{link-or}}` component that works similarly to the standard
`{{link-to}}` helper. While `{{link-to}}` uses positional params, `{{link-or}}` uses
named parameters, because most the api is optional.

**example usage**

```hbs
  {{#link-or route="alerts" component="alert-list"}}<span class="fa fa-alert"></span> Alerts {{/link-or}}
```

By default, the addon renders the component provided at screen sizes below 768px.

You can change the value by providing a `xsmall`, `small`, `medium`, keywords, or a pixel
value.

The keywords map to:

```
  xsmall: 768,
  small: 992,
  medium: 1200
```


## Installation

Todo: Publish to NPM

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
