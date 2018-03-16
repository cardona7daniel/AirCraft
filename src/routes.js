import asyncComponent from './components/AsyncComponent';
import AirCraft from './pages/AirCraft';
import { nextNumber } from './utils/general';

const nextRouteIndex = nextNumber();

const createRoute = (url, component, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  exact,
});

export default [
  createRoute('/', AirCraft, true),
  createRoute(
    '/aircraft',
    asyncComponent(() =>
      import('./pages/AirCraft.js').then(module => module.default),
    ),
  ),
];
