import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

const modules = [
    ButtonModule,
]

@NgModule({
    imports: [
        CommonModule,
        ...modules
    ],
    exports: [
        ...modules
    ]
})

export class PrimeNgModule { }