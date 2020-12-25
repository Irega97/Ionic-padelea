import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator'
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-new-torneo',
  templateUrl: './new-torneo.page.html',
  styleUrls: ['./new-torneo.page.scss'],
})
export class NewTorneoPage implements OnInit {

  torneoForm;
  pulsado = false;
  minDate;

  constructor(private formBuilder: FormBuilder, private torneoService: TorneoService, private router: Router,
    private components: ComponentsService, private events: EventsService) {
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
      maxPlayers: ['', [Validators.required]],
      participa: [true]
    }, { validator : Validator.checkFecha });
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.minDate = new Date().toISOString();
    this.torneoForm.reset();
    this.torneoForm.get('participa').setValue(true);
  }

  submitTorneo(){
    this.pulsado=true
    if(this.torneoForm.invalid){
      return;
    }
    
    let finIns: Date = new Date(this.torneoForm.value.finInscripcion);
    let inicio: Date = new Date (this.torneoForm.value.fechaInicio);
    finIns = new Date(finIns.setHours(23, 59, 59, 999));
    finIns.setHours(finIns.getHours() + 1);
    inicio = new Date(inicio.setHours(1, 0, 0, 0));
    let data = {
      "name": this.torneoForm.value.name,
      "type": this.torneoForm.value.type,
      "description": this.torneoForm.value.description,
      "fechaInicio": inicio,
      "finInscripcion": finIns,
      "ubicacion": this.torneoForm.value.ubicacion,
      "reglamento": this.torneoForm.value.reglamento,
      "numRondas": this.torneoForm.value.numRondas,
      "maxPlayers": this.torneoForm.value.maxPlayers,
      "participa": this.torneoForm.value.participa
    }
    this.torneoService.createTorneo(data).subscribe((data)=>{
      if(data != null) {
        this.components.presentAlert("Torneo creado con éxito");
        this.router.navigateByUrl('principal/torneos');
        this.events.publish({"topic":"new-torneo"});
      }
    }, error => {
      if (error.status == 409){
        this.torneoForm.get('checkTorneoName').setValue(this.torneoForm.value.name);
        this.torneoForm.controls.name.setErrors({checkTorneoName: true});
      }
    });
  }
}
