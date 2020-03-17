import { EmptyComponent } from './test/empty/empty.component';
import { TestProvComponent } from './test/test-prov/test-prov.component';
import { TestProvService } from './test/test-prov.service';
import { TestDirDirective } from './test/test-dir.directive';
import { TestCmpComponent } from './test/test-cmp/test-cmp.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDirComponent } from './test/test-dir/test-dir.component';

const routes: Routes = [
    {
        path: 'test-component',
        component: TestCmpComponent
    },
    {
        path: 'test-directive',
        component: TestDirComponent
    },
    {
        path: 'test-service',
        component: TestProvComponent
    },
    {
        path: 'test-empty',
        component: EmptyComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
