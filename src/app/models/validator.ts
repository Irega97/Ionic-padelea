import{ FormGroup, FormControl } from '@angular/forms'

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
    let finIns: Date = new Date(group.value.finInscripcion);
    let inicio: Date = new Date (group.value.fechaInicio);
    finIns = new Date(finIns.setHours(23, 59, 59, 999));
    inicio = new Date(inicio.setHours(0, 0, 0, 0));
    if (inicio < finIns){
      return ({checkFecha:true});
    }
    else{
      return null;
    }
  }

  static checkPlayers(group: FormControl){
    if (group.value % 4 != 0)
      return ({checkPlayers:true});

    else
      return null;
  }
}
