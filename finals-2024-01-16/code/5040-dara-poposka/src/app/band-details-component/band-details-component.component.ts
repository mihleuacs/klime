import { Component } from '@angular/core';
import { Band } from '../models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/band.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent {
  band?: Band;

  constructor(
    private route: ActivatedRoute, 
    private bandsService: BandsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      //filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.bandsService.getBand(id)),
    ).subscribe({
      next: band => {
        this.band = band;
      },
      error: err => console.log(err)
    })
  }

  deleteBand() {
    throw new Error('Method not implemented.');
  }

  editBand() {
    this.router.navigate(['/bands', this.band!.id, "edit"]);
  }

}


