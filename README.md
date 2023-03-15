# Demo for Custom Breadcrumbs in Theia Widgets

In this sample Theia application we demonstrate how to create custom breadcrumbs for arbitrary widgets.

The main contribution point of interest for this purpose is `BreadcrumbsContribution`, which accepts a class that returns breadcrumbs for the URI that is specified by a `NavigatableWidget`.
By default, there is a breadcrumbs contribution `FilepathBreadcrumbsContribution` by `@theia/filesystem`, which provides breadcrumbs showing the file structure for all file URIs, such as `file://ab/cd`.
Other breadcrumbs contributions can only prepend and append additional breadcrumbs for file URIs.
This is used for instance by the `OutlineBreadcrumbsContribution` to add breadcrumbs for structures within a file according to the outline specified by attached language servers.

However, for URIs with any other scheme, such as `custom://whatever`, the aforementioned default breadcrumb contribution returns an empty array.
Thus, we can create a custom breadcrumbs contribution that has full control over the entire breadcrumbs.

This is precisely what we demonstrate in this demo application (see `custom-breadcrumbs/src/browser/custom-breadcrumbs-fontend-module.ts`).

We register a `CustomBreadcrumbsWidget` that implements `NavigatableWidget` and returns a URI with a custom scheme.
Further, we register a `CustomBreadcrumbsContribution` that returns breadcrumbs for any URIs with that custom scheme.
For demo purposes, we always return a static array of breadcrumbs though.
We also implement the method `attachPopupContent(breadcrumb, parent)`, which allows to control the popup widget that appears on click of a breadcrumb.
In this widget, you can show arbitrary HTML, thus also render a list or tree widget as done by the `FilepathBreadcrumbsContribution`.
For demo purposes though, we just show an arbitrary HTML content.

To try it out, build and run as described below and open the view *CustomBreadcrumbs Widget* via the application menu *View*.

## Prerequisites for running the example

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 10
    nvm use 10

Install yarn.

    npm install -g yarn

## Running the browser example

    yarn start:browser

*or:*

    yarn rebuild:browser
    cd browser-app
    yarn start

*or:* launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn start:electron

*or:*

    yarn rebuild:electron
    cd electron-app
    yarn start

*or:* launch `Start Electron Backend` configuration from VS code.

## Developing with the browser example

Start watching all packages, including `browser-app`, of your application with

    yarn watch

*or* watch only specific packages with

    cd custom-breadcrumbs
    yarn watch

and the browser example.

    cd browser-app
    yarn watch

Run the example as [described above](#Running-the-browser-example)

## Developing with the Electron example

Start watching all packages, including `electron-app`, of your application with

    yarn watch

*or* watch only specific packages with

    cd custom-breadcrumbs
    yarn watch

and the Electron example.

    cd electron-app
    yarn watch

Run the example as [described above](#Running-the-Electron-example)

## Limitations

It is worth nothing that the approach demonstrated in this sample application does not -- at least not without customization of default implementations -- allow to combine custom breadcrumbs with auto-selecting a file in the file navigator on widget activation for a specific file URI.

The auto-selection done by the file navigator depends on a file URI returned by the `NavigatableWidget` implementation.
This however would also enable the default `FilepathBreadcrumbsContribution` which would prevent us from taking full control over the entire breadcrumb array.
Therefore, we need to return a URI with a custom theme, which in turn will disable the auto-selection feature in the file navigator.

If we still need to combine custom widgets with the auto-selection feature in the file navigator, we would either have to rebind a customized version of the `FilepathBreadcrumbsContribution` or the file navigator widget.
