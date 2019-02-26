module.exports = {
    options: {
        transform: [
            [
<<<<<<< HEAD
               "babelify",
=======
                "babelify",
>>>>>>> master
                {
                    "presets": [
                        [
                            "@babel/preset-env", {
                                "targets": {
                                    "node": "current"
                                }
                            }
                        ]
                    ]
                }
            ]
        ],
        browserifyOptions: {
            debug: true
        }
    },
    app: {
        src: ["../scripts/main.js"],
        dest: "../../public/bundle.js"
    }
}
