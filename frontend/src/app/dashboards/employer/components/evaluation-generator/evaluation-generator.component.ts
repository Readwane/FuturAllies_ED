import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AIService } from 'src/app/core/services/ai.service';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { Offer} from 'src/app/features/offer/models/offer.models';
import { RecruitmentQuiz, Evaluation, Section, Content, RecruitmentQuizQuestion,  } from 'src/app/core/models/evaluation.model';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';


@Component({
  selector: 'app-evaluation-generator',
  templateUrl: './evaluation-generator.component.html',
  styleUrls: ['./evaluation-generator.component.css']
})

export class EvaluationGeneratorComponent implements OnInit {
  tabs = ['Quiz de présélection', 'Sujet d\'évaluation technique'];
  selectedTab = 0;

  aiQuizresult: { quiz: any } | null = null;
  aiEvalresult: { evaluation: any } | null = null;


  quizFormat = ['topic', 'difficultyLevel', 'duration', 'totalQuestions'];
  questFormat = ['title', 'order', 'questionType', 'options: string[]', 'correctOptions: string[]', 'points'];
 
  quizGenerated = false;
  evaluationGenerated = false;

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

  private formSubscriptions: Subscription[] = [];

  constructor(
    private quizService: QuizService,
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
      questionQcmCount: [5, [Validators.min(0), Validators.max(10)]],
      questionQcuCount: [5, [Validators.min(0), Validators.max(10)]],
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
      const total = values.questionQcmCount + values.questionQcuCount;
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
    // Abonnements reactifs pour les prompts
    this.setupPromptListeners();
  }

  ngOnDestroy(): void {
    this.formSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private setupPromptListeners(): void {
    // Écoute des changements pour le quiz
    const quizControls = [
      'difficulty', 'questionQcmCount', 'questionQcuCount', 
      'quizDuration', 'totalPoints'
    ];
    
    quizControls.forEach(controlName => {
      const sub = this.quizForm.get(controlName)?.valueChanges.subscribe(() => {
        this.updateQuizPrompt();
      });
      if (sub) this.formSubscriptions.push(sub);
    });

    // Écoute des changements pour l'évaluation
    const evalControls = [
      'difficulty', 'totalSections', 'evalDuration', 'totalPoints'
    ];
    
    evalControls.forEach(controlName => {
      const sub = this.evaluationForm.get(controlName)?.valueChanges.subscribe(() => {
        this.updateEvaluationPrompt();
      });
      if (sub) this.formSubscriptions.push(sub);
    });
  }

  private updateQuizPrompt(): void {
    const newPrompt = this.generateQuizPrompt();
    this.quizForm.patchValue({ quizPrompt: newPrompt }, { emitEvent: false });
  }

  private updateEvaluationPrompt(): void {
    const newPrompt = this.generateEvaluationPrompt();
    this.evaluationForm.patchValue({ evalPrompt: newPrompt }, { emitEvent: false });
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

    // Pré-remplissage initial
    this.quizForm.patchValue({
      profil: this.currentOffer.profil,
      quizTopic: this.currentOffer.topic,
    });

    this.evaluationForm.patchValue({
      profil: this.currentOffer.profil,
      technicalTopic: this.currentOffer.topic,
    });

    // Génération initiale après pré-remplissage
    this.updateQuizPrompt();
    this.updateEvaluationPrompt();

    // Ré-abonnements après pré-remplissage
    this.setupPromptListeners();
  }

  private generateQuizPrompt(): string {
    const formValues = this.quizForm.getRawValue();
    const offer = this.currentOffer;
  
    return `"quizPrompt": "Génère un quiz d'évaluation de preselection pour le ${offer?.topic}.\n
    Considère les informations suivantes pour la création du quiz:\n
    - **Description du Poste**: ${offer?.description}\n
    - **Compétences Requises**: ${offer?.requirements}\n
    - **Questions Demandées**:\n
    - ${formValues.questionQcmCount} questions à choix multiple (MCQ) (1 ou plusieurs réponses possibles)\n
    - ${formValues.questionQcuCount} questions à choix unique (UCQ) (une seule réponse correcte)\n
    - **Difficulté**: ${formValues.difficulty}\n
    - **Durée de l'évaluation**: ${formValues.quizDuration} minutes\n
    - **Structure Exemple pour la Réponse Attendue**:\n
    {
      "quiz": {
        "title": "Titre du quiz (Ex: Recrutement d'un comptable senior)",
        "difficulty": "${formValues.difficulty}",
        "duration": ${formValues.quizDuration},
        "totalQuestions": ${formValues.questionTotalCount},
        "questions": [
          {
            "title": "Titre de la question",
            "order": numéro de la question,
            "questionType": "MCQ", // MCQ pour Multiple Choice Question
            "options": [
              "Option 1",
              "Option 2",
              "Option n"
            ],
            "correctOptions": [
              "Option correcte 1", 
              "Option correcte 2" // Si question de type MCQ
            ]
          },
          {
            "title": "Titre de la question",
            "order": numéro de la question,
            "questionType": "UCQ", // UCQ pour Unique Choice Question
            "options": [
              "Option 1",
              "Option 2",
              "Option n"
            ],
            "correctOptions": [
              "Option correcte 1" // Si question de type UCQ
            ]
          }
          // Répétez pour chaque type de question
        ]
      }
    }"
    `.replace(/^\s+/gm, '');  // Nettoyage des espaces pour éviter des espaces inutiles en début de ligne
  }
  
  private generateEvaluationPrompt(): string {
    const formValues = this.evaluationForm.getRawValue();
    const offer = this.currentOffer;

    return `    "evaluationPrompt": "Génère un sujet d'évaluation technique structuré pour le recrutement d'un(e) Comptable Senior, en respectant les critères ci-dessous sans demander d'informations supplémentaires.\n\n### **Critères à respecter :**\n- **Poste à pourvoir** : Comptable Senior\n- **Niveau d'Études Requis** : Bac+4\n- **Exigences spécifiques** : Bac+4 en comptabilité, minimum 5 ans d'expérience dans une banque\n- **Responsabilités principales** : Gestion des comptes clients, suivi des transactions et préparation des bilans financiers.\n- **Nombre de sections** : 3\n- **Niveau de difficulté** : intermediate (Junior / Intermédiaire / Senior)\n- **Durée de l'évaluation** : 60 minutes\n- **Instructions spécifiques** : Aucune instruction spécifique\n\n### **Format attendu pour la réponse :**\n{\n  \"evaluation\": {\n    \"topic\": \"Évaluation technique pour Comptable Senior\",\n    \"difficulty\": \"intermediate\",\n    \"duration\": 60,\n    \"totalSections\": 3,\n    \"sections\": [\n      {\n        \"title\": \"Section 1 - Connaissances générales en Comptable Senior\",\n        \"order\": 1,\n        \"content\": [\n          {\n            \"type\": \"qcm\",\n            \"content\": [\"Question 1 : Décrivez les principales compétences nécessaires pour un(e) Comptable Senior.\", \"Question 2 : Quels sont les outils logiciels typiquement utilisés dans ce domaine ?\"]\n          }\n        ]\n      },\n      {\n        \"title\": \"Section 2 - Étude de cas pratique\",\n        \"order\": 2,\n        \"content\": [\n          {\n            \"type\": \"cas_pratique\",\n            \"content\": [\"Analysez une situation fictive en lien avec les responsabilités du poste et proposez des solutions adéquates.\"]\n          }\n        ]\n      },\n      {\n        \"title\": \"Section 3 - Exercices pratiques (selon le profil)\",\n        \"order\": 3,\n        \"content\": [\n          {\n            \"type\": \"exercice_pratique\",\n            \"content\": [\"Réalisez une tâche spécifique (ex : rapport financier, analyse de données, gestion d’un projet, etc.).\"]\n          }\n        ]\n      }\n    ]\n  }\n}"
            `.trim();
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  
  cleanJsonString(jsonString: string): string {
    return jsonString.replace(/```json|```/g, '').trim();
  }
  

  generateQuiz() {
    if (this.evaluationForm.invalid) {
      this.quizForm.markAllAsTouched(); // Force l'affichage des erreurs du formulaire
      return;
    }
    this.isLoading = true;
    const formData = this.quizForm.get('quizPrompt')?.value;
  
    this.aiService.generateQuiz({ quizPrompt: formData }).subscribe({
      next: (response) => {
        if (response.success) {
          this.aiQuizresult = JSON.parse(this.cleanJsonString(response.quiz));
          console.log('Réponse API complète:', this.aiQuizresult);
          this.quizGenerated = true;
        } else {
          console.error('Erreur API:', response.message);
        }
      },
      error: (error) => {
        console.error('Erreur API:', error);
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }
  
  generateEvaluation() {
    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched(); // Force l'affichage des erreurs du formulaire
      return;
    }
    this.isLoading = true;
    
    // Récupérer uniquement le champ 'evaluationPrompt'
    const evaPrompt = this.evaluationForm.get('evalPrompt')?.value;
    
    // Appeler l'API avec le prompt spécifique
    this.aiService.generateTechnicalTest({ evaluationPrompt: evaPrompt }).subscribe({
      next: (response) => {
        if (response.success) {
          this.aiEvalresult = JSON.parse(this.cleanJsonString(response.evaluation));
          console.log('Réponse API complète:', this.aiEvalresult);
          this.evaluationGenerated = true;
        } else {
          console.error('Erreur API:', response.message);
        }
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

  saveQuiz(): void {
    const offerId = this.currentOffer?._id || '';  // Récupère l'ID de l'offre actuelle
  
    // Vérifie si l'ID de l'offre est valide
    if (!offerId) {
      console.error('L\'ID de l\'offre est requis.');
      this.isLoading = false;
      return;
    }
  
    // Vérifie si un quiz existe déjà pour cette offre en envoyant une requête au serveur
    this.quizService.getQuizzesByOfferId(offerId).subscribe({
      next: (existingQuizzes) => {
        // Si un quiz existe déjà pour cette offre
        if (existingQuizzes.length > 0) {
          console.warn('Un quiz existe déjà pour cette offre.');
          this.isLoading = false;
          return;
        }
  
        // Si aucun quiz n'est trouvé, procéder à la sauvegarde du nouveau quiz
        this.processQuizSave();
      },
      error: (error) => {
        console.error('Erreur lors de la vérification du quiz:', error);
        this.isLoading = false;
      }
    });
  }

  private processQuizSave(): void {
    if (this.quizGenerated && this.aiQuizresult?.quiz) {
      this.isLoading = true;
        this.generatedQuiz = new RecruitmentQuiz(
        '', 
        this.currentOffer?._id || '', // ID de l'offre
        this.aiQuizresult.quiz.title,
        this.aiQuizresult.quiz.difficulty,
        this.aiQuizresult.quiz.duration,
        this.aiQuizresult.quiz.totalQuestions,
        this.aiQuizresult.quiz.totalPoints || 100, // Assurez-vous que totalPoints est défini
        new Date(),
        new Date()
      );
      // Initialisation du tableau de questions
      this.generatedQuestions = [];
  
      // Conversion des questions de l'IA
      this.aiQuizresult.quiz.questions.forEach((q: any) => {
        const question = new RecruitmentQuizQuestion(
          '', // ID généré côté serveur
          '', // Quiz ID sera mis à jour après la création du quiz
          q.title,
          q.order,
          q.questionType,
          q.options,
          q.correctOptions,
          q.points || 1, // Valeur par défaut si manquant
          new Date(),
          new Date()
        );
        this.generatedQuestions?.push(question);
       
      });
  
      // Appel du service
      this.quizService.saveQuiz(this.generatedQuiz, this.generatedQuestions).subscribe({
        next: (response) => {
          console.log('Quiz sauvegardé avec succès:', response);
          // Mise à jour des IDs si nécessaire
          if (response.quiz && response.questions) {
            this.generatedQuiz = response.quiz;
            this.generatedQuestions = response.questions;
          }
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde:', error);
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
    }
  }

  saveEval(): void {
    const offerId = this.currentOffer?._id || '';
    
    // Vérification si l'offerId est défini
    if (!offerId) {
      console.warn("L'ID de l'offre est requis.");
      this.isLoading = false;
      return;
    }
  
    // Vérifier si une évaluation existe déjà pour l'offre
    this.quizService.getEvaluationsByOfferId(offerId).subscribe({
      next: (existingEvaluations) => {
        // Si des évaluations existent déjà
        if (existingEvaluations && existingEvaluations.length > 0) {
          console.warn('Une évaluation existe déjà pour cette offre.');
          this.isLoading = false;
          return;
        }
  
        // Si aucune évaluation n'est trouvée pour l'offerId
        console.log("Aucune évaluation trouvée pour cette offre, on peut enregistrer une nouvelle évaluation.");
        // Appeler la méthode pour sauvegarder la nouvelle évaluation
        this.processEvalSave();
      },
      error: (error) => {
        // Si l'erreur est un 404, cela signifie qu'il n'y a pas d'évaluation existante
        if (error.status === 404) {
          console.log("Aucune évaluation trouvée pour cette offre.");
          // Optionnel : Ajouter un message à l'interface utilisateur ici si nécessaire
        } else {
          console.error('Erreur lors de la vérification de l\'évaluation:', error);
        }
        this.isLoading = false;
      }
    });
  }
  
  
  private processEvalSave(): void {
    if (this.evaluationGenerated && this.aiEvalresult?.evaluation) {
      this.isLoading = true;
  
      // Créer une nouvelle évaluation à partir des résultats générés par l'IA
      this.generatedEvaluation = new Evaluation(
        '', // ID généré côté serveur
        this.currentOffer?._id || '', // ID de l'offre
        this.aiEvalresult.evaluation.topic,
        this.aiEvalresult.evaluation.difficulty,
        this.aiEvalresult.evaluation.duration,
        this.aiEvalresult.evaluation.totalSections,
        this.aiEvalresult.evaluation.totalPoints || 100, // Assurez-vous que totalPoints est défini
        new Date(),
        new Date()
      );
  
      // Initialisation des sections et contenus
      this.generatedSections = [];
      this.generatedContents = [];
  
      // Conversion des sections de l'IA
      this.aiEvalresult.evaluation.sections.forEach((sec: any) => {
        const section = new Section(
          '', // ID généré côté serveur
          '', // Evaluation ID sera mis à jour après la création de l'évaluation
          sec.title,
          sec.order,
          sec.points || 1, // Valeur par défaut si manquant
          new Date(),
          new Date()
        );
        this.generatedSections?.push(section);
  
        // Conversion des contenus associés à la section
        sec.content.forEach((cont: any) => {
          const content = new Content(
            '', // ID généré côté serveur
            '', // Section ID sera mis à jour après la création de la section
            cont.type,
            cont.content,
            new Date(),
            new Date()
          );
          this.generatedContents?.push(content);
        });
      });
  
      // Appel du service pour enregistrer l'évaluation, les sections et les contenus
      this.quizService.saveEvalTest(
        this.generatedEvaluation,
        this.generatedSections,
        this.generatedContents
      ).subscribe({
        next: (response) => {
          console.log('Évaluation sauvegardée avec succès:', response);
  
          // Mise à jour des IDs générés après la sauvegarde
          if (response.evaluation && response.sections && response.contents) {
            this.generatedEvaluation = response.evaluation;
            this.generatedSections = response.sections;
            this.generatedContents = response.contents;
          }
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde de l\'évaluation:', error);
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
    }
  }
}