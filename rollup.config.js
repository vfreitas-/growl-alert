const buble = require('rollup-plugin-buble')
    , uglify = require('rollup-plugin-uglify')
    , eslint = require('rollup-plugin-eslint')
    , sass = require('rollup-plugin-sass')
    , postcss = require('postcss')
    , autoprefixer = require('autoprefixer')



let config = {
    entry: 'src/index.js',
    dest: 'dist/growl-alert.js',
    format: 'umd',
    context: 'window',
    moduleName: 'growl',
    plugins: [ 
        buble({
            exclude: 'src/sass/**/*.scss'
        }),

    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        uglify(),
        sass({
            output: 'dist/growl-alert.css',
            processor: css => postcss([autoprefixer]).process(css)
        })
    )
} else {
    config.plugins.unshift(
        eslint({
            exclude: 'src/sass/**/*.scss'
        }),
        sass()
    )
}

module.exports = config
