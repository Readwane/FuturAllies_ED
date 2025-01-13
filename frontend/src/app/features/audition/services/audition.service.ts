import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Adjust the path to your environment file
import { Domain, Part, Course, Chapter, Section, Content, Quiz, Question, CourseLearned, CourseReview } from '../models/audition.models';


@Injectable({
  providedIn: 'root',
})
export class AuditionService {
  private apiUrl = environment.apiBaseUrl;  // Adjust the base API URL

  constructor(private http: HttpClient) {}

  // Domain CRUD operations

  createDomain(domain: Domain): Observable<Domain> {
    return this.http.post<Domain>(`${this.apiUrl}/domains`, domain);
  }

  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiUrl}/domains`);
  }

  getDomainById(id: string): Observable<Domain> {
    return this.http.get<Domain>(`${this.apiUrl}/domains/${id}`);
  }

  updateDomain(id: string, domain: Domain): Observable<Domain> {
    return this.http.put<Domain>(`${this.apiUrl}/domains/${id}`, domain);
  }

  deleteDomain(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/domains/${id}`);
  }

  // Course CRUD operations

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

  // Part CRUD operations

  createPart(part: Part): Observable<Part> {
    return this.http.post<Part>(`${this.apiUrl}/parts`, part);
  }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(`${this.apiUrl}/parts`);
  }

  getPartById(id: string): Observable<Part> {
    return this.http.get<Part>(`${this.apiUrl}/parts/${id}`);
  }

  updatePart(id: string, part: Part): Observable<Part> {
    return this.http.put<Part>(`${this.apiUrl}/parts/${id}`, part);
  }

  deletePart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/parts/${id}`);
  }

  // Chapter CRUD operations

  createChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(`${this.apiUrl}/chapters`, chapter);
  }

  getChapters(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.apiUrl}/chapters`);
  }

  getChapterById(id: string): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.apiUrl}/chapters/${id}`);
  }

  updateChapter(id: string, chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(`${this.apiUrl}/chapters/${id}`, chapter);
  }

  deleteChapter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/chapters/${id}`);
  }

  // Section CRUD operations

  createSection(section: Section): Observable<Section> {
    return this.http.post<Section>(`${this.apiUrl}/sections`, section);
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.apiUrl}/sections`);
  }

  getSectionById(id: string): Observable<Section> {
    return this.http.get<Section>(`${this.apiUrl}/sections/${id}`);
  }

  updateSection(id: string, section: Section): Observable<Section> {
    return this.http.put<Section>(`${this.apiUrl}/sections/${id}`, section);
  }

  deleteSection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sections/${id}`);
  }

  // Content CRUD operations

  createContent(content: Content): Observable<Content> {
    return this.http.post<Content>(`${this.apiUrl}/contents`, content);
  }

  getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiUrl}/contents`);
  }

  getContentById(id: string): Observable<Content> {
    return this.http.get<Content>(`${this.apiUrl}/contents/${id}`);
  }

  updateContent(id: string, content: Content): Observable<Content> {
    return this.http.put<Content>(`${this.apiUrl}/contents/${id}`, content);
  }

  deleteContent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contents/${id}`);
  }

  // Quiz CRUD operations

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/quizzes`, quiz);
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/quizzes`);
  }

  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/quizzes/${id}`);
  }

  updateQuiz(id: string, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/quizzes/${id}`, quiz);
  }

  deleteQuiz(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quizzes/${id}`);
  }

  // Question CRUD operations

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions`, question);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/questions/${id}`);
  }

  updateQuestion(id: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${id}`, question);
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questions/${id}`);
  }

  // CourseLearned CRUD operations

  getCourseLearneds(userId: string): Observable<CourseLearned[]> {
    return this.http.get<CourseLearned[]>(`${this.apiUrl}/course-learneds/${userId}`);
  }

  getCourseLearnedById(id: string): Observable<CourseLearned> {
    return this.http.get<CourseLearned>(`${this.apiUrl}/course-learneds/${id}`);
  }

  createCourseLearned(courseLearned: CourseLearned): Observable<CourseLearned> {
    return this.http.post<CourseLearned>(`${this.apiUrl}/course-learneds`, courseLearned);
  }

  updateCourseLearned(id: string, courseLearned: CourseLearned): Observable<CourseLearned> {
    return this.http.put<CourseLearned>(`${this.apiUrl}/course-learneds/${id}`, courseLearned);
  }

  deleteCourseLearned(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/course-learneds/${id}`);
  }

  // CourseReview CRUD operations

  createCourseReview(courseReview: CourseReview): Observable<CourseReview> {
    return this.http.post<CourseReview>(`${this.apiUrl}/course-reviews`, courseReview);
  }

  getCourseReviews(): Observable<CourseReview[]> {
    return this.http.get<CourseReview[]>(`${this.apiUrl}/course-reviews`);
  }

  getCourseReviewById(id: string): Observable<CourseReview> {
    return this.http.get<CourseReview>(`${this.apiUrl}/course-reviews/${id}`);
  }

  updateCourseReview(id: string, courseReview: CourseReview): Observable<CourseReview> {
    return this.http.put<CourseReview>(`${this.apiUrl}/course-reviews/${id}`, courseReview);
  }

  deleteCourseReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/course-reviews/${id}`);
  }
}
