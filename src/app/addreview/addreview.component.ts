import { Component, OnInit } from '@angular/core';
import { BookReview } from '../model/bookReview';
import { ReviewService } from '../services/review.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.scss']
})
export class AddreviewComponent implements OnInit {

  id: number;
  bookName:string = ""
  bookAuthor:string = "";
  bookReview:string = "";
  bookPages:number = null;
  bookPrice:number = null;
  bookRating:number = null;

  btnText:string = "Add review";

  headingText:string = "Add a review";

  constructor(private reviewService: ReviewService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      if (param['id']) {
        this.id = param['id'];
        this.bookName = param['name'];
        this.bookAuthor = param['author'];
        this.bookReview = param['review'];
        this.bookPages = param['pages'];
        this.bookRating = param['rating'];
        this.bookPrice = param['price'];

        this.headingText = "Edit review";
        this.btnText = "Update"
      }
    })
  }

  /**
   * @function addReview
   * @description Adding a new Review of a Book or updating existing review 
   * @param review 
   */
  addReview(review: BookReview) {
    review.rating = +review.rating;
    review = Object.assign({ ownerId: +localStorage.getItem('userId') }, review);
    if (this.btnText === "Add review") {
      this.reviewService.addReview(review).subscribe(data => {
        this.router.navigate(['/myreviews']);
      })

    } else {
      this.reviewService.updateReviewById(this.id, review).subscribe(data => {
        this.router.navigate(['/myreviews']);
      })

    }
  }
}
