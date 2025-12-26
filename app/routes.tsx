import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('Layout.tsx', [
    index('routes/Home.tsx'),
    route('system/:system', 'routes/System.tsx'),
    route('system/:system/:game', 'routes/Game.tsx'),
    route('system/:system/:game/:pattern', 'routes/Patterns.tsx'),
  ]),
] satisfies RouteConfig;
