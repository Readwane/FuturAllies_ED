import AdminJS from 'adminjs';
import { ComponentLoader } from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { resources } from './ressources.js';

// Enregistrement de l'adaptateur Mongoose avec AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

// Instanciez ComponentLoader pour charger les composants personnalisés
const componentLoader = new ComponentLoader();

// Options de personnalisation d'AdminJS
const adminJsOptions = {
  branding: {
    companyName: 'FuturAllies',
    logo: 'http://localhost:3000/assets/imgs/logo-futurallies.png',
    favicon: 'http://localhost:3000/assets/favicon.ico',
    login: {
      message: 'Bienvenue sur FuturAllies - Gérez vos données avec simplicité et efficacité.',
    },
  },
  resources,
  dashboard: {
    component: componentLoader.add('Dashboard', `${process.cwd()}/admin/components/dashboard`),
  },
  rootPath: '/admin',
};

const adminJs = new AdminJS(adminJsOptions);
export default adminJs;
