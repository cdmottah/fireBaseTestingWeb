import { faTasks,faGear } from "@fortawesome/free-solid-svg-icons";
import { routes } from "@models/routes.model";

export const MENU_ROUTES: routes[] = [
  { name: 'My tasks', redirectTo: '/app/tasks/list', icon: faTasks },
  { name: 'Configuration', redirectTo: '/app/config', icon: faGear },

]
