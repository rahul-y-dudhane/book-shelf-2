import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AdminSevice } from '../services/admin.service';
import { BookReview } from '../model/bookReview';

@Component({
  selector: 'app-viewreview',
  templateUrl: './viewreview.component.html',
  styleUrls: ['./viewreview.component.scss', '../../assets/css/animation-css.scss']
})
export class ViewreviewComponent implements OnInit {
  id: number
  review: BookReview;
  userName: string;
  hideBtn: boolean = true;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService,
    private router: Router, private adminService: AdminSevice) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.reviewService.getReviewById(+params['id']).subscribe(data => {
        this.review = data;
        this.adminService.getAdminById(this.review.ownerId).subscribe(data => {
          this.userName = data.firstName + " " + data.lastName;
          if (this.route.snapshot.routeConfig.path === "allreviews/:id") {
            this.hideBtn = true;
          } else {
            this.hideBtn = false;
          }
        })

      })

    })
  }

  /**
   * @function deleteReview
   * @description Making a service call to delete a review 
   * @param id 
   */
  deleteReview(id: number) {
    this.reviewService.deleteReviewById(id).subscribe(data => {
      this.router.navigate(['/myreviews']);
    },
      error => {
        console.log(error);
      })
  }

  /**
   * @function editReview
   * @description Nvavigate to add review screen with selected review data
   * @param review 
   */
  editReview(review: any[]) {
    this.router.navigate(['/review', review]);
  }
}
