import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';


const modules = [
    ButtonModule,
    CardModule,
    MenubarModule,
    SidebarModule,
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