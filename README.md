# vivid-design-patterns

Vivid Design Patterns are a collection of styles, design tokens and re-usable react components that provide logic and uniformity for Vivid apps.

## How to Install
`yarn add @vividseats/vivid-design-patterns`

or

`npm install @vividseats/vivid-design-patterns --save`

  
## Documentation
To run and view documentation locally:

`yarn start:docs`

You can view and modify the jsx of any component by pressing the view code button `</>`.

For more information on creating documentation with Docz, visit: https://github.com/pedronauck/docz/blob/master/README.md


## Testing
To run tests:

`yarn test`


Full documentation here: http://vivid-design-patterns-master.vividseats.test

## Local development with other projects
If you want to make changes to vivid-design-patterns and test them in a separate project without the need to publish the package, do the following:

```$xslt
$ cd vivid-design-patterns
$ npm link
$ cd your-other-project
$ npm link @vividseats/vivid-design-patterns
``` 

If you are using webpack in your other project, be sure to include this following to your webpack config,

```$xslt
    {
        resolve: {
            symlink: false
        }
    }
```