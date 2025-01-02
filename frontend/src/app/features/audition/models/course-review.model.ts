import { CommonModule } from "@angular/common"

export class CourseReview {
   userId: string;  
   courseId: string;  
   rating: number;  
   comment: string; 
   reviewDate: Date;

  constructor(
      userId: string,  
      courseId: string,  
      rating: number,  
      comment: string,  
      reviewDate: Date  
  ) {
    this.userId = userId;
    this.courseId = courseId;
    this.rating = rating;
    this.comment = comment;
    this.reviewDate = reviewDate;

  }
  }
  