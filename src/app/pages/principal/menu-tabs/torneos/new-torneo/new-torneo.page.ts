import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator';
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

  constructor(private formBuilder: FormBuilder, private torneoService: TorneoService, private router: Router,
    private components: ComponentsService, private events: EventsService) {
  }

  ngOnInit() {
    this.torneoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    }); 
    
  }

  submitTorneo(){
    let data = {
      "name": this.torneoForm.value.name
    }
    this.torneoService.createTorneo(data).subscribe((data)=>{
      if(data != null) {
        this.events.publish("new-torneo");
        this.components.presentAlert("Torneo creado con éxito");
        this.router.navigateByUrl('principal/torneos');
      }
    });
  }
}
