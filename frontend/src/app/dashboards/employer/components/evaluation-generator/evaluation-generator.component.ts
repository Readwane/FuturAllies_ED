import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AIService } from 'src/app/core/services/ai.service';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { Offer, RecruitmentQuiz } from 'src/app/features/offer/models/offer.models';
import { RecruitmentQuizQuestion } from 'src/app/core/models/recruitment.model';
import { Evaluation } from 'src/app/features/offer/models/offer.models';
import { Section } from 'src/app/features/offer/models/offer.models';
import { Content } from 'src/app/features/offer/models/offer.models';

@Component({
  selector: 'app-evaluation-generator',
  templateUrl: './evaluation-generator.component.html',
  styleUrls: ['./evaluation-generator.component.css']
})
export class EvaluationGeneratorComponent implements OnInit {

  tabs = ['Quiz de présélection', 'Sujet d\'évaluation technique'];
  selectedTab = 0;

  quizForm: FormGroup;
  evaluationForm: FormGroup;

  isLoading = false;
  currentOffer?: Offer; 

  // Résultats générés
  generatedQuiz?: RecruitmentQuiz;
  generatedQuestions?: RecruitmentQuizQuestion[];
  generatedEvaluation?: Evaluation;
  generatedSections?: Section[];
  generatedContents?: Content[];

  constructor(
    private aiService: AIService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private offerService: OfferService
  ) {
    this.quizForm = this.fb.group({
      profil: ['', Validators.required],
      quizTopic: ['', Validators.required],
      quizPrompt: ['', Validators.required],
      difficulty: ['medium', Validators.required],
      questionQcmCount: [0, [Validators.min(0), Validators.max(10)]],
      questionQcuCount: [0, [Validators.min(0), Validators.max(10)]],
      questionTotalCount: [{ value: 0, disabled: true }, [Validators.required, Validators.min(5), Validators.max(20)]],
      quizDuration: [30, [Validators.min(30), Validators.max(120)]],
      totalPoints: [100, [Validators.min(50), Validators.max(200)]]
    });

    this.evaluationForm = this.fb.group({
      profil: ['', Validators.required],
      technicalTopic: ['', Validators.required],
      evalPrompt: ['', Validators.required],
      difficulty: ['intermediate', Validators.required],
      evalDuration: [60, [Validators.min(60), Validators.max(180)]],
      totalSections: [3, [Validators.min(1), Validators.max(5)]],
      totalPoints: [100, [Validators.min(50), Validators.max(200)]]
    });

    this.quizForm.valueChanges.subscribe(values => {
      const total = (values.questionQcmCount || 0) + (values.questionQcuCount || 0);
      this.quizForm.patchValue({ questionTotalCount: total }, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const offerId = params['offerId'];
      if (offerId) {
        this.loadOffer(offerId);
      }
    });
  }

  private loadOffer(offerId: string): void {
    this.offerService.getOfferById(offerId).subscribe({
      next: (offer) => {
        this.currentOffer = offer;
        this.prefillForms();
      },
      error: (err) => console.error('Erreur chargement offre:', err)
    });
  }

  private prefillForms(): void {
    if (!this.currentOffer) return;

    // Pré-remplissage du formulaire Quiz
    this.quizForm.patchValue({
      profil: this.currentOffer.profil,
      quizTopic: this.currentOffer.topic,
      quizPrompt: this.generateQuizPrompt()
    });

    // Pré-remplissage du formulaire Évaluation
    this.evaluationForm.patchValue({
      profil: this.currentOffer.profil,
      technicalTopic: this.currentOffer.topic,
      evalPrompt: this.generateEvaluationPrompt()
    });
  }

  private generateQuizPrompt(): string {
    return `Génère un quiz de présélection pour le poste de ${this.currentOffer?.profil}.\n\n`
      + `**Thème principal** : ${this.currentOffer?.topic}\n`
      + `**Description du poste** : ${this.currentOffer?.description}\n`
      + `**Compétences requises** : ${this.currentOffer?.requirements}\n`
      + `**Niveau d'éducation** : ${this.currentOffer?.educationLevel}`;
  }

  private generateEvaluationPrompt(): string {
    return `Génère un sujet d'évaluation technique pour ${this.currentOffer?.profil}.\n\n`
      + `**Domaine technique** : ${this.currentOffer?.domain}\n`
      + `**Responsabilités clés** : ${this.currentOffer?.responsibilities}\n`
      + `**Technologies requises** : ${this.currentOffer?.requirements}`;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  generateQuiz() {
    if (this.quizForm.invalid) return;
    this.isLoading = true;

    const formData = {
      ...this.quizForm.getRawValue(),
      questionTotalCount: this.quizForm.get('questionTotalCount')?.value
    };

    this.aiService.generateQuiz(formData).subscribe({
      next: (response: { quiz: RecruitmentQuiz, questions: RecruitmentQuizQuestion[] }) => {
        this.generatedQuiz = response.quiz;
        this.generatedQuestions = response.questions;
      },
      error: (error) => {
        console.error('Erreur API:', error);
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  generateEvaluation() {
    if (this.evaluationForm.invalid) return;
    this.isLoading = true;

    this.aiService.generateTechnicalTest(this.evaluationForm.value).subscribe({
      next: (response: { evaluation: Evaluation, sections: Section[], contents: Content[] }) => {
        this.generatedEvaluation = response.evaluation;
        this.generatedSections = response.sections;
        this.generatedContents = response.contents;
      },
      error: (error) => {
        console.error('Erreur API:', error);
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  regeneratePrompt(type: 'quiz' | 'evaluation'): void {
    if (type === 'quiz') {
      this.quizForm.patchValue({ quizPrompt: this.generateQuizPrompt() });
    } else {
      this.evaluationForm.patchValue({ evalPrompt: this.generateEvaluationPrompt() });
    }
  }

  getContentById(_t248: string): any {
    throw new Error('Method not implemented.');
  }
}