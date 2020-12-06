import{ FormControl, FormGroup } from '@angular/forms'

export class Validator {
    static validUsername(fc: FormControl){
        if(fc.value.toLowerCase() === "hola"){
            return ({validUsername: true});
          } 
          else {
            return (null);
          }
    }

    static validEmail(fc: FormControl){
      if (fc.value.toLowerCase() === "hola@gmail.com"){
        return ({validEmail:true});
      }
      else{
        return(null);
      }
    }

    static checkPassword(group: FormGroup){
      console.log(group);
    }
}
