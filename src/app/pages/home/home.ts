import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gist } from '../../models/gist.model';
import { GistService } from '../../services/gist.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  displayedColumns: string[] = [
    'owner',
    'filename',
    'fileCount',
    'updatedAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<Gist>();
  loading = true;
  error: string | null = null;

  pageSize = 10;
  viewMode: 'table' | 'card' = 'table';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gistService: GistService) {}

  ngOnInit(): void {
    this.loadGists();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private loadGists(): void {
    this.gistService.getPublicGists().subscribe({
      next: (data) => {
        this.dataSource.data = data;
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

  onViewChange(event: MatButtonToggleChange): void {
    console.log('View changed to:', event.value);
  }
}
