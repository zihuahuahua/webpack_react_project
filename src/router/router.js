import DelayLoading from '../components/DelayLoading'
import Loadable from 'react-loadable'
export const NoFound = Loadable({ loader: () => import('../pages/404'), loading: DelayLoading, delay: 3000 });
export const Home = Loadable({ loader: () => import('../pages/home'), loading: DelayLoading, delay: 3000 });
export const mailbox = Loadable({ loader: () => import('../pages/mailbox'), loading: DelayLoading, delay: 3000 });

