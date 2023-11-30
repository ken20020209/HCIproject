import auth from './auth';
import route from './route';
import management from './management';
import food from './food';
import order from './order';
import restaurant from './restaurant';

export default [...auth, ...route, ...management, ...food, ...order, ...restaurant];
