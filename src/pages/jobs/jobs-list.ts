import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Job } from '../../models/interfaces/job.interface';
import { Observable } from 'rxjs/Observable';
import { JobListService } from '../../models/services/firebase.service';

@IonicPage()
@Component({
  selector: 'page-jobs-list',
  templateUrl: 'jobs-list.html'
})
export class JobsListPage {

  job_list$: Observable<Job[]>

  constructor(private navCtrl: NavController, private actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private job: JobListService) {
    this.job_list$ = this.job
    .getJobList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, 
          ...c.payload.val()
        }))
      }
    )
  }

  addJob(): void{
    this.navCtrl.push('JobCreationPage');
  }

  selectJob(job: Job){
    this.actionSheetCtrl.create({
      title: `${job.name}`,
      buttons: [
        {
          text: 'Upload Mechanical Drawing',
          icon: 'cloud-upload',
          handler: () => {
            //Send the user to the  TaskCreationPage and pass the key as a parameter
            //this.navCtrl.push('TaskCreationPage', { jobID: job.$key });
          }
        },
        {
          text: 'Generate 3D Model',
          icon: 'cube',
          handler: () => {
            //Send the user to the  TaskCreationPage and pass the key as a parameter
            //this.navCtrl.push('TaskCreationPage', { jobID: job.$key });
          }
        },
        {
          text: 'Add Duct Work',
          icon: 'add',
          handler: () => {
            //Send the user to the  TaskCreationPage and pass the key as a parameter
            this.navCtrl.push('DuctListPage', { jobID: job.key });
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            //Send the user to the JobEditPage and pass the key as a parameter
            this.navCtrl.push('JobEditPage', { jobID: job.key });
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () => {

            console.log(job.key);
            this.alertCtrl.create({
              title: 'Are you serious mate?',
              //message: 'Are you f*cking serius?',
              buttons: [
                {
                  text: 'No',
                  handler: () => {
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    //Delete the current ShoppingItem
                    //this.job_list$.remove(job);
                  }
                }
              ]
            }).present();

          }
        },
        {
          text: 'Cancel',
          icon: 'undo',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }

}
