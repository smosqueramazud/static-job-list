import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServicesService } from 'src/app/services/data-services.service';
import { catchError, throwError } from 'rxjs';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  arrayPersons: Person[] | undefined;

  ngOnInit() {
    this.getInfoPersons();
  }

  dataService: DataServicesService = inject(DataServicesService);

  async getInfoPersons(){
    await this.dataService.getInfoPersons()
    .pipe(
      catchError((err: any) => {
        return throwError(err);
      }),
    )
    .subscribe(res => {
      this.arrayPersons = res;
      console.log(this.arrayPersons)
    });
  }
}
