import { Router } from 'express';
import { bookRoutes } from '../modules/books/books.routes';
import { membersRoutes } from '../modules/members/members.routes';

const router = Router()

const moduleRoutes = [
  {
    path:'/books',
    route:bookRoutes
  },
  {
    path:'/members',
    route:membersRoutes
  }
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;