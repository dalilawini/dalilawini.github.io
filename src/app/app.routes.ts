import { ResolveFn, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PROJECTS } from './data/projects.data';

const projectTitle: ResolveFn<string> = route => {
    const project = PROJECTS.find(p => p.slug === route.paramMap.get('slug'));
    return `${project?.title ?? 'Project'} | Mohamed Ali Lawini`;
};

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Mohamed Ali Lawini | Embedded Software Engineer'
    },

    {
        path: 'projects/:slug',
        loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
        title: projectTitle
    },

    {
        path: 'installer',
        loadComponent: () => import('./pages/web-installer/web-installer.component').then(m => m.WebInstallerComponent),
        title: 'ESP Web Installer | Mohamed Ali Lawini'
    },

    {
        path: 'installer/:slug',
        loadComponent: () => import('./pages/web-installer/web-installer.component').then(m => m.WebInstallerComponent),
        title: route => `Install ${PROJECTS.find(p => p.slug === route.paramMap.get('slug'))?.title ?? 'firmware'} | Mohamed Ali Lawini`
    },

    {
        path: '**',
        redirectTo: ''
    }
];
