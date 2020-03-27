import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriorityService, Priority } from 'src/app/services/priority.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-priority-details',
  templateUrl: './priority-details.page.html',
  styleUrls: ['./priority-details.page.scss'],
})
export class PriorityDetailsPage implements OnInit {

  priority = {
    attributes: {
      ordre: null,
      titre: ''
    },
    id: ''
  };

  id = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private priorityService: PriorityService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

  }


  ionViewWillEnter() {
    if (this.id) {
      this.priorityService.getPriority(this.id).then(p => {
        this.priority.id = this.id;
        this.priority.attributes.ordre = p[0].attributes.ordre;
        this.priority.attributes.titre = p[0].attributes.titre;
      });
    }
  }

  addPriority() {
    this.priorityService.addPriority({ ordre: this.priority.attributes.ordre, titre: this.priority.attributes.titre }).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Priorité ajoutée');
    }, err => {
      this.showToast('Une erreur s\'est produite lors de l\'ajout.');
    });
  }

  deletePriority() {
    this.priorityService.deletePriority(this.priority.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Priorité supprimée');
    }, err => {
      this.showToast('Une erreur s\'est produite lors de la suppression.');
    });
  }

  updatePriority() {
    this.priorityService.updatePriority(
      { id: this.priority.id, titre: this.priority.attributes.titre, ordre: this.priority.attributes.ordre }).then(() => {
        this.router.navigateByUrl('/');
        this.showToast('Priorité modifiée');
      }, err => {
        this.showToast('Une erreur s\'est produite lors de la modification.');
      });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
