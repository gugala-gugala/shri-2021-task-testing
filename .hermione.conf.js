module.exports = {
    baseUrl: 'http://127.0.0.1:3000/hw/store/',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    screenshotsDir: 'C:\\Repo\\yandex\\shri-2021-task-testing',

    sets: {
        desktop: {
            files: 'test/hermione'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    // plugins: {
    //     'html-reporter/hermione': {
    //         path: 'hermione-html-reporter'
    //     }
    // }
}