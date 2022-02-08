'use strict'
let UserForma = new UserForm();
UserForma.loginFormCallback = (data) => {
   ApiConnector.login(data, request => {
       console.log(request);
       if (request.success) {
           location.reload()
       } else {
           UserForma.setLoginErrorMessage(request.error)
       }
   });
}

UserForma.registerFormCallback = (data) => {
    ApiConnector.register(data, newRequest => {
        console.log(newRequest);
        if (newRequest.success) {
            location.reload()
        } else {
            UserForma.setRegisterErrorMessage(newRequest.error)
        }
    });
}




