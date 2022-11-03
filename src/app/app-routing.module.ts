import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { EspecialistasComponent } from './componentes/especialistas/especialistas.component';
import { RegistroAdministradorComponent } from './componentes/registro-administrador/registro-administrador.component';
import { HomeComponent } from './componentes/home/home.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'registro/admin', component: RegistroAdministradorComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'esp', component: EspecialistasComponent },
  { path: 'home', component: HomeComponent },
  { path: 'misTurnos', component: MisTurnosComponent },
  { path: 'solicitarTurnos', component: SolicitarTurnosComponent },
  { path: 'miPerfil', component: MiPerfilComponent },
  { path: 'turnos', component: TurnosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
