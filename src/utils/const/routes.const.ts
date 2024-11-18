export enum Routes {
  Home = '/',
  MyCharacters = '/my-characters',
  Login = '/login',
  Register = '/register'
}

export const NAVIGATION_ROUTES = [
  { name: 'Inicio', href: Routes.Home },
  { name: 'Mis personajes', href: Routes.MyCharacters }
]
