function vip() {

   let name, email, password, username;
   name = document.getElementById("name").value;
   username = document.getElementById("user").value;
   email = document.getElementById("email").value;
   password = document.getElementById("password").value;
   admin = document.getElementById("admin").checked;

   let user_record = new Array()
   user_record = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []

   if (user_record.some((v) => {
      return v.email == email
   })) {
      alert("User already exist!")
   }

   else {
      user_record.push({
         "name": name,
         "username": username,
         "email": email,
         "password": password,
         "admin": admin,
         "cartData": []
      })

      localStorage.setItem("users", JSON.stringify(user_record))
      window.location.href = 'login.html'
   }

}

document.getElementById("name").addEventListener('input', (event) => {

   var name = event.target.value
   var key = name.toLowerCase().replace(/ /g, '_')
   document.getElementById("user").value = key;

})

document.getElementById('form').addEventListener('submit', (event) => {
   event.preventDefault()
   vip()
})