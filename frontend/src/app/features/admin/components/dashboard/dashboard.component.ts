// app/admin/dashboard/dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dashboardData = {
    stats: {
      activeUsers: 1200,
      recentCourses: 45,
      jobOffers: 15,
      certificationsIssued: 340
    },
    trends: [
      { month: 'Jan', users: 200 },
      { month: 'Feb', users: 300 },
      { month: 'Mar', users: 400 },
      { month: 'Apr', users: 350 },
      { month: 'May', users: 800 },
      { month: 'Jun', users: 9000 },
      { month: 'Jul', users: 4500 },
      { month: 'Aug', users: 3800 },
      { month: 'Sep', users: 3200 },
      { month: 'Oct', users: 5000 },
      { month: 'Nov', users: 7000 },
      { month: 'Dec', users: 6000 }
    ],
    quickActions: [
      { label: 'Ajouter un cours', icon: 'add', route: '/add-course' },
      { label: 'Publier une offre', icon: 'work_outline', route: '/add-job' },
    ],
    recentOffers: [
      { title: 'Stage Développeur Angular', company: 'TechCorp', deadline: '2024-11-30' },
      { title: 'Emploi Data Scientist', company: 'DataLabs', deadline: '2024-12-05' },
    ]
  };

  public trendsData = this.dashboardData.trends.map(t => ({
    name: t.month,
    value: t.users,
  }));
}
