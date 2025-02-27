import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton,MatButtonModule,MatIconButton } from '@angular/material/button';
import { MatToolbar,MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';

@Component({
    selector: 'app-header-admin',
    templateUrl: './header-admin.component.html',
    styleUrls: ['./header-admin.component.css'],
    imports: [CommonModule,RouterModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatToolbarModule,MatToolbar,MatIcon,MatBadge,MatButton,MatIconButton,RouterModule],
    standalone: true
})
export class HeaderAdminComponent {
    searchForm: FormGroup;
    usuarioLogado: Usuario | null = null;
    userRole: string | null = null;
    private subscription = new Subscription();


    constructor(private router: Router,private formBuilder: FormBuilder,private sidebarService: SidebarService,private authService: AuthService) {
        this.searchForm = this.formBuilder.group({
            query: ['']
        });
    }

    ngOnInit(): void {
        this.subscription.add(this.authService.getUsuarioLogado().subscribe(
            usuario => {
                this.usuarioLogado = usuario;
                this.userRole = this.authService.getUserRole();
            }
        ));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    logout() {
        this.authService.removeToken();
        this.authService.removeUser();
        this.router.navigateByUrl('/login');
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

    onSearch(): void {
        const query = this.searchForm.get('query')?.value;
        if(query) {
            this.router.navigate(['/loja'],{ queryParams: { search: query } });
        }
    }

    clickMenu() {
        this.sidebarService.toggle();
    }
}