import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OfferService } from '../../../services/offer.service';
import { Offer } from '../../../models/offer.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {
  displayedColumns: string[] = ['type', 'title', 'enterprise', 'location', 'status', 'actions'];
  dataSource = new MatTableDataSource<Offer>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offerService.getOffers().subscribe((offers: Offer[]) => {
      this.dataSource.data = offers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewOffer(offer: Offer): void {
    console.log('Viewing offer:', offer);
  }

  editOffer(offer: Offer): void {
    console.log('Editing offer:', offer);
  }

  deleteOffer(offerId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.offerService.deleteOffer(offerId).subscribe(() => {
        this.fetchOffers();
      });
    }
  }


  onAddClick(): void {
    this.router.navigate([`employer-dashboard/create`]);
  }
}
