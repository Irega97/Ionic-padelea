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

  static checkPassword(group: FormGroup){
    if (group.value.password != group.value.confirmpassword){
      return ({checkPassword:true})
    }
    else{
      return(null);
    }
  }
}
