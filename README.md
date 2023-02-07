# easy-tooltip

Very easy to use tooltip. Highly customisable.

## Properties

- `tip`: (string | HTML)
- `tipPosition`: "`top`" | "`right`" | "`bottom`" | "`left`", default "`top`"
- `arrowPosition`: "`start`" | "`center`" | "`end`", default "`center`"
- `backgroundColor`: any web color, default `#000000bd`
- `textColor`: any web color, default `#ffffff`
- `maxWidth`: parent | length | percentage, default `none`

## How to use

The properties are matched by the use of data attributes on your HTML element. Usage of a `<span>` is recommended.

    <p>This is an <span data-tip="Hello world">example</span> text with a tooltip</p>

Or with HTML:

    <p>This is an <span data-tip="Hello<br>world<br>This<br>would<br>have<br>line-breaks">example</span> text with a tooltip</p>

Other data attributes:

- `data-tip`
- `data-tip-position`
- `data-tip-arrow-position`
- `data-tip-bg-color`
- `data-tip-text-color`
- `data-tip-max-width`

Only one required is of course `data-tip`. All others are optional to add styling of your choice.
