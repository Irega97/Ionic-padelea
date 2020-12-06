import{ FormControl, FormGroup } from '@angular/forms'

export class Validator {

  static validUsername(group: FormGroup){
    if(group.parent != undefined){
      console.log("Checkname: " + group.parent.value.checkname);
      if(group.value == group.parent.value.checkname){
        return ({validUsername: true});
      }
      else {
        return (null);
      }
    }
  }

  static validEmail(group: FormGroup){
    if (group.parent != undefined){
      console.log("Checkmail: " + group.parent.value.checkmail);
      if (group.value == group.parent.value.checkmail){
        return ({validEmail:true});
      }
      else{
        return(null);
      }
    }
  }

  static checkPassword(group: FormGroup){
    if (group.parent != undefined){
      if (group.parent.value.password != group.value){
        return ({checkPassword: true})
      }
      else{
        return (null);
      }
    }
  }
}
