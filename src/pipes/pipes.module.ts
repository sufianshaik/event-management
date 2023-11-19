import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { ToArrayPipe } from './to-array.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    ToArrayPipe
  ],
  exports : [
    FilterPipe,
    ToArrayPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
