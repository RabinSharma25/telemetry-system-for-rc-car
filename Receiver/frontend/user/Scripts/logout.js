  document.getElementById('logout').addEventListener('click', function() {
      // Show SweetAlert confirmation
      Swal.fire({
        title: 'Logout',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
      }).then((result) => {
        if (result.isConfirmed) {          
          Swal.fire(
            'Logged Out!',
            'You have successfully logged out.',
            'success'
          )
          setTimeout(() => {
        window.location.replace('login.html'); // Redirect to welcome.html after 3 seconds
      }, 3000);
        }
      });
    });
