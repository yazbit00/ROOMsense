import { CreateRoomYannikComponent } from './create-room-yannik/create-room-yannik.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SensorBoxComponent } from './sensor-box/sensor-box.component';
import { WarningBoxComponent } from './warning-box/warning-box.component';
import { DataListTestComponent } from './data-list-test/data-list-test.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './display-components/main-page/main-page.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { TempHumDetailComponent } from './room-details/temp-hum-detail/temp-hum-detail.component';

const routes: Routes = [
  {path: '', component: FloorplanComponent},
  {path: 'data', component: DataListTestComponent },
  {path: 'create-room', component: CreateRoomComponent },
  {path: 'create-room-yannik', component: CreateRoomYannikComponent},
  {path: 'floorplan', component: FloorplanComponent },


  // {path: 'home', component: MainPageComponent},

  { path: 'home', redirectTo: '/' },
  {path: 'room-detail', component: TempHumDetailComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
