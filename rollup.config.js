const buble         = require('rollup-plugin-buble')
    , uglify        = require('rollup-plugin-uglify')
    , eslint        = require('rollup-plugin-eslint')
    , sass          = require('rollup-plugin-sass')
    , postcss       = require('postcss')
    , autoprefixer  = require('autoprefixer')

/**
 * Library Name
 */
const libName = 'growl-alert'

const env = process.env.NODE_ENV

let config = {
    entry: 'src/index.js',
    dest: `dist/${libName}.js`,
    format: 'umd',
    context: 'window',
    moduleName: 'growl',
    plugins: [ 
        buble({
            exclude: 'src/sass/**/*.scss'
        })
    ]
}

const prefixer = autoprefixer({
    browsers: ['last 4 versions', 'IE 10']
})

if (env === 'production') {
    config.plugins.push(
        sass({
            output: `dist/${libName}.css`,
            processor: css => postcss([prefixer]).process(css)
        })
    )
} else if (env === 'minify') {
    config.dest = `dist/${libName}.min.js`
    config.plugins.push(
        uglify(),
        sass({
            output: `dist/${libName}.min.css`,
            processor: css => postcss([prefixer]).process(css),
            options: {
                outputStyle: 'compressed'
            }
        })
    )
} else {
    config.plugins.unshift(
        eslint({
            exclude: 'src/sass/**/*.scss'
        }),
        sass({
            insert: true
        })
    )
}

module.exports = config
