# ember-link-or

[![Greenkeeper badge](https://badges.greenkeeper.io/donaldwasserman/ember-link-or.svg)](https://greenkeeper.io/)
[![Ember Observer Score](https://emberobserver.com/badges/ember-link-or.svg)](https://emberobserver.com/addons/ember-link-or)

This draft addon is an example of how to accomplish having a link for large
screens that renders a component, but on smaller screens links to a seperate route.

This project is ~stolen~ inspired by [Oli Griffith's](https://github.com/oligriffiths)
2017 Ember Conf talk about replicating native-ish behavior to generate a popover
at larger screen sizes but render a link at smaller ones.

## Usage

This addon provides a `{{link-or}}` component that works similarly to the standard
`{{link-to}}` helper. While `{{link-to}}` uses positional params, `{{link-or}}` uses
named parameters, because much the api is optional.

**Papercuts ahead:** While most of the functionality of `{{link-to}}` has been
replicated here, there may be some rough patches.8

### Basics

```hbs
  {{#link-or routeName="alerts" routeArgs=model component="alert-list" componentArgs=model}}<span class="fa fa-alert"></span> Alerts {{/link-or}}
```
The `routeName` and `routeArgs` correspond to the first two params of `{{link-to route id}}`.

Pass the name of a valid component in `component` and provide any arguments via the `componentArgs`.

### Media Query Support

By default, the addon renders the component provided at screen sizes below 768px,
by setting the default `size` parameter to `xsmall`.

You can change the value by providing a `xsmall`, `small`, `medium`, keywords, or a pixel
value.

```hbs
  {{#link-or routeName="alerts" component="alert-list" size="medium"}} Link {{/link-or}}
```

or

```hbs
  {{#link-or routeName="alerts" component="alert-list" size="989"}} Link {{/link-or}}
```

The keywords map to (these are the default Bootstrap media queries):

```
  xsmall: 768,
  small: 992,
  medium: 1200
```


## Installation

`ember install ember-link-or`

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
