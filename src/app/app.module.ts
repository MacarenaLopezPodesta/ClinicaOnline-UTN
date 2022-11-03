import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule} from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './componentes/nav/nav.component';
import { ListadoEspecialidadesComponent } from './componentes/listado-especialidades/listado-especialidades.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { EspecialistasComponent } from './componentes/especialistas/especialistas.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { RegistroAdministradorComponent } from './componentes/registro-administrador/registro-administrador.component';
import { HomeComponent } from './componentes/home/home.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { EspecialidadesComponent } from './componentes/especialidades/especialidades.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { SeleccionPacienteComponent } from './componentes/seleccion-paciente/seleccion-paciente.component';
import { TurnosPacientesComponent } from './componentes/turnos-pacientes/turnos-pacientes.component';
import { TurnosEspecialistasComponent } from './componentes/turnos-especialistas/turnos-especialistas.component';
import { ListadoTurnosComponent } from './componentes/listado-turnos/listado-turnos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavComponent,
    ListadoEspecialidadesComponent,
    UsuarioComponent,
    ListadoUsuariosComponent,
    EspecialistasComponent,
    PacientesComponent,
    RegistroAdministradorComponent,
    HomeComponent,
    MisTurnosComponent,
    TurnosComponent,
    SolicitarTurnosComponent,
    EspecialidadesComponent,
    MiPerfilComponent,
    SeleccionPacienteComponent,
    TurnosPacientesComponent,
    TurnosEspecialistasComponent,
    ListadoTurnosComponent,

  ],
  imports: [
    RecaptchaModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
