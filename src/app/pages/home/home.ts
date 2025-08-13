import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gist } from '../../models/gist.model';
import { AuthService } from '../../services/auth.service';
import { GistService } from '../../services/gist.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  allGists: Gist[] = [];
  paginatedGists: Gist[] = [];
  displayedColumns: string[] = [
    'owner',
    'filename',
    'fileCount',
    'updatedAt',
    'actions',
  ];

  isLoggedIn = false;
  dataSource = new MatTableDataSource<Gist>();
  loading = true;
  error: string | null = null;

  pageSize = 10;
  currentPage = 0;
  viewMode: 'table' | 'card' = 'table';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private gistService: GistService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });

    this.loadGists();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe((event) => {
        this.currentPage = event.pageIndex;
        this.updatePaginatedGists();
      });
    }
  }

  private loadGists(): void {
    this.gistService.getPublicGists().subscribe({
      next: (data) => {
        this.allGists = data;
        this.updatePaginatedGists();
      },
      error: (err) => {
        this.error = 'Failed to load gists';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private updatePaginatedGists(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedGists = this.allGists.slice(start, end);
  }

  onViewToggle(event: MatButtonToggleChange): void {
    this.viewMode = event.value;
    this.updatePaginatedGists();
  }

  getGistName(gist: Gist): string {
    return gist?.files ? Object.keys(gist.files)[0] : 'N/A';
  }

  onGistClick(gist: Gist): void {
    console.log('Row clicked:', gist);
  }

  onForkGist(gistId: string): void {
    console.log('Forking gist with ID:', gistId);
  }

  onStarGist(gistId: string): void {
    console.log('Starring gist with ID:', gistId);
  }
}
