import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CuriositiesComponent } from './components/curiosities/curiosities.component';
import { RegisterComponent } from './components/register/register.component';
import { CrudComponent } from './components/crud/crud.component';

export const routes: Routes = [{
    path:"",
    component: SidebarComponent,
    children:[{
        path:"home",
        component:HomeComponent
    },{
        path:"curiosities",
        component:CuriositiesComponent
    },{
        path:"",
        redirectTo:"home",
        pathMatch:'full'
    },{
        path:"config",
        component:CrudComponent
    },{
        path:"coriosities",
        component:CuriositiesComponent
    }]},
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    }
];
