import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { createMemoryHistory } from 'history';
import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import * as redux from 'react-redux';
import { Catalog } from '../../src/client/pages/Catalog'
import events from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Cart } from '../../src/client/pages/Cart';
import { render, within } from '@testing-library/react';

describe('Проверка главного экрана приложения', () => {
  it('Рендерится главный экран приложения', () => {
    const history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByRole } = render(application);
    const rootLink = getByRole('link', { name: /Example store/i });
    const expected = 'Example store';
  
    expect(rootLink.textContent).toBe(expected);
  });

  it('Рендерится navbar c ссылками', () => {
    const history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByTestId, getByRole, container } = render(application);
    const navbar = container.querySelector('.navbar-nav');
    const rootLink = getByRole('link', { name: /Example store/i });
    const catalogLink = getByRole('link', { name: /catalog/i });
    const deliveryLink = getByRole('link', { name: /delivery/i });
    const contactsLink = getByRole('link', { name: /contacts/i });
    const cartLink = getByRole('link', { name: /cart/i });

    expect(navbar).toBeInTheDocument();
    expect(rootLink).toBeInTheDocument();
    expect(catalogLink).toBeInTheDocument();
    expect(deliveryLink).toBeInTheDocument();
    expect(contactsLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();

    expect(rootLink).toHaveAttribute('href', '/');
    expect(catalogLink).toHaveAttribute('href', '/catalog');
    expect(deliveryLink).toHaveAttribute('href', '/delivery');
    expect(contactsLink).toHaveAttribute('href', '/contacts');
    expect(cartLink).toHaveAttribute('href', '/cart');
  })
})

describe('Проверка работы роутера', () => {
  it('Работает переход на страницу Catalog', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/catalog'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByRole } = render(application);
    userEvent.click(getByRole('link', { name: /catalog/i }));
    const header = getByRole('heading', { name: /catalog/i });

    expect(header).toBeInTheDocument();
  });

  it('Работает переход на страницу Delivery', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/delivery'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );
    
    const { getByRole } = render(application);
    userEvent.click(getByRole('link', { name: /delivery/i }));
    const header = getByRole('heading', { name: /delivery/i });
    const deliverySnapshot = renderer.create(application).toJSON();

    expect(header).toBeInTheDocument();
    expect(deliverySnapshot).toMatchSnapshot();
  });

  it('Работает переход на страницу Contacts', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/contacts'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByRole } = render(application);
    userEvent.click(getByRole('link', { name: /contacts/i }));
    const header = getByRole('heading', { name: /contacts/i });
    const contactsSnapshot = renderer.create(application).toJSON();

    expect(header).toBeInTheDocument();
    expect(contactsSnapshot).toMatchSnapshot();
  });

  it('Работает переход на страницу Cart', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/cart'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByRole } = render(application);
    userEvent.click(getByRole('link', { name: /cart/i }));
    const header = getByRole('heading', { name: /shopping cart/i })

    expect(header).toBeInTheDocument();
  });
})

describe('Проверка Каталога товаров', () => {
  const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue([
      { id: 1, name: 'iphone', price: 150 },
      { id: 2, name: 'notebook', price: 300 },
    ]);
  
    const history = createMemoryHistory({
      initialEntries: ['/hw/store', '/hw/store/catalog'],
      initialIndex: 1,
    });
  
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
  it('Получаем список товаров на странице Catalog', async () => {
    const catalog = (
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>
    );
    const { getAllByRole, getAllByTestId, getByText } = await render(catalog);
  
    const links = getAllByRole('link', { name: /details/i });
  
    expect(getAllByTestId('1').length).not.toBe(0);
    expect(getAllByTestId('2').length).not.toBe(0);
  
    expect(getByText('iphone')).toBeInTheDocument();
    expect(getByText('notebook')).toBeInTheDocument();
  
    expect(getByText(/\$150/i)).toBeInTheDocument();
    expect(getByText(/\$300/i)).toBeInTheDocument();
  
    expect(links.length).toBe(2);
  });

  it('При клике на ссылку details происходит переход на карточку товара', async () => {
    const app = (
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    )
    const { getByRole, getAllByRole } = await render(app);

    events.click(getByRole('link', { name: /catalog/i }));

    const links = getAllByRole('link', { name: /details/i });
    events.click(links[0]);

    expect(getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  })

})

describe('Проверка Каталога товаров', () => {
  const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue([
      { id: 1, name: 'iphone', price: 150 },
      { id: 2, name: 'notebook', price: 300 },
    ]);
  
    const history = createMemoryHistory({
      initialEntries: ['/hw/store', '/hw/store/catalog'],
      initialIndex: 1,
    });
  
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
  it('Получаем список товаров на странице Catalog', async () => {
    const catalog = (
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>
    );
    const { getAllByRole, getAllByTestId, getByText } = await render(catalog);
  
    const links = getAllByRole('link', { name: /details/i });
  
    expect(getAllByTestId('1').length).not.toBe(0);
    expect(getAllByTestId('2').length).not.toBe(0);
  
    expect(getByText('iphone')).toBeInTheDocument();
    expect(getByText('notebook')).toBeInTheDocument();
  
    expect(getByText(/\$150/i)).toBeInTheDocument();
    expect(getByText(/\$300/i)).toBeInTheDocument();
  
    expect(links.length).toBe(2);
  });

  it('При клике на ссылку details происходит переход на карточку товара', async () => {
    const app = (
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    )
    const { getByRole, getAllByRole } = await render(app);

    events.click(getByRole('link', { name: /catalog/i }));

    const links = getAllByRole('link', { name: /details/i });
    events.click(links[0]);

    expect(getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  })

})

