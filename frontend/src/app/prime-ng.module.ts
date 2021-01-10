import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng-lts/button';
import { CardModule } from 'primeng-lts/card';
import { MenubarModule } from 'primeng-lts/menubar';
import { SidebarModule } from 'primeng-lts/sidebar';
import { GMapModule } from 'primeng-lts/gmap';

const modules = [
    ButtonModule,
    CardModule,
    MenubarModule,
    SidebarModule,
    GMapModule,
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