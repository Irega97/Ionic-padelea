import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator'
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { ModalController } from '@ionic/angular';
import { PickupLocationPage } from './pickup-location/pickup-location.page';

@Component({
  selector: 'app-new-torneo',
  templateUrl: './new-torneo.page.html',
  styleUrls: ['./new-torneo.page.scss'],
})
export class NewTorneoPage implements OnInit {

  torneoForm;
  pulsado = false;
  minDate;
  pickupLocation: string;
  ubication: any;
 


  constructor(private formBuilder: FormBuilder, private torneoService: TorneoService, private router: Router,
    private components: ComponentsService, private events: EventsService, public modalController: ModalController) {
  }

  ngOnInit() {
    this.torneoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validator.checkTorneoName]],
      checkTorneoName: [],
      type: ['', [Validators.required]],
      description: [''],
      fechaInicio: ['', [Validators.required]],
      finInscripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      reglamento: ['', [Validators.required]],
      numRondas: ['', [Validators.required]],
      maxPlayers: ['', [Validators.required, Validator.checkPlayers]],
      duracionRondas: ['', [Validators.required]],
      participa: [true]
    }, { validator : Validator.checkFecha});
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.minDate = new Date().toISOString();
    this.torneoForm.reset();
    this.torneoForm.get('participa').setValue(true);
    
  }

  async openModal() {
    const modal = await this.modalController.create({
    component: PickupLocationPage});
    modal.onDidDismiss().then((data: any)=>{
      this.ubication = data.data;
      if(this.ubication != null) {
        this.torneoForm.get('ubicacion').setValue(this.ubication.name);
      }
    });
    return await modal.present();
   }

  submitTorneo(){
    this.pulsado=true
    if(this.torneoForm.invalid){
      return;
    }
    
    let finIns: Date = new Date(this.torneoForm.value.finInscripcion);
    let inicio: Date = new Date (this.torneoForm.value.fechaInicio);
    finIns = new Date(finIns.setHours(23, 59, 59, 999));
    inicio = new Date(inicio.setHours(1, 0, 0, 0));
    
    let ubi = {
      name: this.ubication.name,
      type: "Point",
      coordinates:[this.ubication.lat, this.ubication.lng]
    };
    console.log("JAJA: ", ubi);

    let data = {
      "name": this.torneoForm.value.name,
      "type": this.torneoForm.value.type,
      "description": this.torneoForm.value.description,
      "fechaInicio": inicio,
      "finInscripcion": finIns,
      "ubicacion": ubi,
      "reglamento": this.torneoForm.value.reglamento,
      "numRondas": this.torneoForm.value.numRondas,
      "maxPlayers": this.torneoForm.value.maxPlayers,
      "duracionRondas": this.torneoForm.value.duracionRondas,
      "participa": this.torneoForm.value.participa
    }
    this.torneoService.createTorneo(data).subscribe((data)=>{
      if(data != null) {
        this.components.presentAlert("Torneo creado con éxito");
        this.router.navigateByUrl('principal/torneos');
      }
    }, error => {
      if (error.status == 409){
        this.torneoForm.get('checkTorneoName').setValue(this.torneoForm.value.name);
        this.torneoForm.controls.name.setErrors({checkTorneoName: true});
      }
    });
  }
}
