const { assert } = require('chai');

describe('github', async function() {
    it('Тест, который пройдет', async function() {
        //await this.browser.url('https://github.com/gemini-testing/hermione/');
        await this.browser.url('https://shri.yandex/hw/store/');

        await this.browser.assertView('plain', '.navbar-brand', {
            compositeImage: true,
        });

        const title = await this.browser.$('.navbar-brand').getText();
        console.log(title)
        assert.equal(title, 'Example store');
    });
});

// describe('Тестим магаз', () => {
//     it('Добавляем товар', async () => {
//         const browser = this.browser;
//         await browser.url('catalog');

//         // await this.browser.assertView('plain', '#readme', {
//         //     compositeImage: true,
//         // });

//         const title = await this.browser.$('.col h1').getText();
//         assert.equal(title, 'Catalog');
//     })
// })