/**
 * Routes for the application.
 */
export enum Routes {
  Home = '/',
  MyCharacters = '/my-characters',
  Login = '/login',
  Register = '/register'
}

/**
 * Array of navigation routes.
 */
export const NAVIGATION_ROUTES = [
  { name: 'Inicio', href: Routes.Home },
  { name: 'Mis personajes', href: Routes.MyCharacters }
]
