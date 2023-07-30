import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServicesService } from 'src/app/services/data-services.service';
import { catchError, throwError } from 'rxjs';
import { Person } from 'src/app/models/person';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CardFiltersComponent } from './components/card-filters/card-filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardFiltersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  arrayPersons: Person[] | undefined;
  newArrayPersons: Person[] = [];
  arrayFilter: string[] = [];

  ngOnInit() {
    this.getInfoPersons();
  }

  dataService: DataServicesService = inject(DataServicesService);

  async getInfoPersons() {
    await this.dataService.getInfoPersons()
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        }),
      )
      .subscribe(res => {
        this.arrayPersons = res;
        this.arrayPersons.forEach(e => {
          e.logo = e.logo.replace('.', '');
        }
        );
      });
  }

  addFilter(element: string) {
    if (this.arrayFilter.length > 0) {
      if (this.arrayFilter.find(obj => obj === element) != undefined) {
        return
      } else {
        this.arrayFilter.push(element);
        this.filterList(this.arrayFilter);
      }
    } else {
      this.arrayFilter.push(element);
      this.filterList(this.arrayFilter);
    }

  }

  filterList(arrayFilters: string[]) {
    this.newArrayPersons = [];
    arrayFilters.forEach(e => {
      this.arrayPersons?.forEach(res => {
        if (e === res.level) {
          if (this.newArrayPersons.indexOf(res) === -1) {
            this.newArrayPersons.push(res);
            this.arrayPersons = this.newArrayPersons;
          }
        } else if (e === res.role) {
          if (this.newArrayPersons.indexOf(res) === -1) {
            this.newArrayPersons.push(res);
            this.arrayPersons = this.newArrayPersons;
          }
        }
        res.languages.forEach(obj => {
          if (e === obj) {
            if (this.newArrayPersons.indexOf(res) === -1) {
              this.newArrayPersons.push(res);
              this.arrayPersons = this.newArrayPersons;
            }
          }
          res.tools.forEach(obj => {
            if (e === obj) {
              if (this.newArrayPersons.indexOf(res) === -1) {
                this.newArrayPersons.push(res);
                this.arrayPersons = this.newArrayPersons;
              }
            }
          })
        })
      })
    })

  }

  getarrayFilters(array: string[]) {
    this.arrayFilter = array;
    if (this.arrayFilter.length === 0) {
      this.getInfoPersons();
    }
  }

}
