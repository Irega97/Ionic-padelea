import{ AbstractControl, FormControl, FormGroup } from '@angular/forms'

export class Validator {

  static validUsername(group: FormGroup){
    if(group.parent != undefined){
      if(group.value == group.parent.value.checkusername){
        return ({validUsername: true});
      }
      else {
        return (null);
      }
    }
  }

  static validEmail(group: FormGroup){
    if (group.parent != undefined){
      if (group.value == group.parent.value.checkemail){
        return ({validEmail:true});
      }
      else{
        return(null);
      }
    }
  }

  static checkTorneoName(group: FormGroup){
    if(group.parent != undefined){
      if(group.value == group.parent.value.checkTorneoName)
        return ({checkTorneoName:true});
      else 
        return null;
    }
  }

  static checkPassword(group: FormGroup){
    if (group.value.password != group.value.confirmpassword){
      return ({checkPassword:true})
    }
    else{
      return(null);
    }
  }

  static checkFecha(group: FormGroup){
    console.log("Fecha Inicio", group.value.fechaInicio);
    console.log("Fecha Inscripcion", group.value.finInscripcion);
    if (group.value.fechaInicio < group.value.finInscripcion){
      console.log("Entra en el if");
      return ({checkFecha:true});
    }
    else{
      return null;
    }
  }
}
