import{ FormControl } from '@angular/forms'

export class Validator {
    static validUsername(fc: FormControl){
        if(fc.value.toLowerCase() === "hola"){
            return ({validUsername: true});
          } 
          else {
            return (null);
          }
    }
}
