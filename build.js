var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require("metalsmith-layouts");
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var frontmatter = require('metalsmith-matters');

var HandlebarsLayouts = require('handlebars-layouts');
HandlebarsLayouts.register(handlebars);


metalsmith(__dirname)
    .frontmatter(true)
    .use(frontmatter({
         'delims': ['---json', '---'],
          'options': {
            'lang': 'json'
          }
    }))
    .metadata({
        site: {
            name: 'Make your CV',
            description: "Make your CV easily"
        }
    })
    .source('./src/pages')
    .destination('./dist')
    .use(collections({
        posts: 'pages/*.md'
    }))
    .use(markdown())    
    .use(layouts({
        engine: 'handlebars',
        directory: './src/layouts',
        default: 'default.html',
        pattern: ["*/*/*.html","*/*.html","*.html"],
        partials: 'src/layouts/partials/'
    }))
    .build(function(err) {
        if ( err ) {
            console.log(err);
        } else {
            console.log('Site built!');
        }
    });