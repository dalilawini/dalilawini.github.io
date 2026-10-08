import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { findProject } from './data/projects.data';
import { RouteTitle } from './core/title.strategy';

const projectTitle: RouteTitle = route =>
    findProject(route.paramMap.get('slug'), { detailOnly: true })?.title ?? { en: 'Project', fr: 'Projet' };

const installerTitle: RouteTitle = route => {
    const project = findProject(route.paramMap.get('slug'));
    return project
        ? { en: `Install ${project.title.en}`, fr: `Installer ${project.title.fr}` }
        : { en: 'ESP Web Installer', fr: 'Installeur web ESP' };
};

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'projects/:slug',
        loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
        data: { title: projectTitle }
    },

    {
        path: 'installer',
        loadComponent: () => import('./pages/web-installer/web-installer.component').then(m => m.WebInstallerComponent),
        data: { title: installerTitle }
    },

    {
        path: 'installer/:slug',
        loadComponent: () => import('./pages/web-installer/web-installer.component').then(m => m.WebInstallerComponent),
        data: { title: installerTitle }
    },

    {
        path: '**',
        redirectTo: ''
    }
];
