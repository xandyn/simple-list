const jsonServer = require('json-server');
const times = require('lodash/times');
const faker = require('faker');

const generateData = () => {
  const identity = {
    isAuthenticated: false,
    name: faker.name.firstName()
  };
  const products = times(20, (i) => ({
    id: i,
    price: faker.commerce.price(),
    currency: faker.finance.currencyCode(),
    name: faker.commerce.productName(),
    description: faker.lorem.lines(2),
    color: faker.commerce.color(),
    company: faker.company.companyName()
  }));

  return { identity, products };
};

const db = generateData();

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
