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

## Building
To build the javascript assets:

`yarn run build:js`

## Local development with other projects
If you want to make changes to vivid-design-patterns and test them in a separate project without the need to publish the package, do the following:

```$xslt
$ cd vivid-design-patterns
$ yarn link
$ cd your-other-project
$ yarn link @vividseats/vivid-design-patterns
``` 

If you are using webpack in your other project, be sure to include this following to your webpack config,

```$xslt
    {
        resolve: {
            symlinks: false
        }
    }
```

Alternatively, you can change the reference in the `package.json` of `your-other-project` to the github repo

```
{
  "@vividseats/vivid-design-patterns": "git+ssh://git@github.com:VividSeats/vivid-design-patterns.git#<BRANCH_NAME>",
}
```

Each time you make a change to vivid-design patterns, rerun `yarn run build:js` to see the changes reflected in `your-other-project`


