import { Router } from 'express';
import { bookRoutes } from '../modules/books/books.routes';
import { membersRoutes } from '../modules/members/members.routes';
import { borrowRoutes } from '../modules/borrow/borrow.routes';

const router = Router()

const moduleRoutes = [
  {
    path:'/books',
    route:bookRoutes
  },
  {
    path:'/members',
    route:membersRoutes
  },
  {
    path:'/borrow',
    route:borrowRoutes
  }
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;