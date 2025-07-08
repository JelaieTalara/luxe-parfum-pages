// ---------------------
// Google Login Handler
// ---------------------
function handleCredentialResponse(response) {
    try {
      const data = jwt_decode(response.credential);
      displayUserInfo("Google", data.name, data.email, data.picture);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }
  
  // ---------------------
  // Facebook SDK Init
  // ---------------------
  window.fbAsyncInit = function () {
    FB.init({
      appId: '1965694400628682',
      cookie: true,
      xfbml: true,
      version: 'v19.0'
    });
    FB.AppEvents.logPageView();
  };
  
  // ---------------------
  // Facebook Login Callback
  // ---------------------
  function checkLoginState() {
    document.getElementById("loader").style.display = 'block';
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        FB.api('/me', { fields: 'name,email,picture' }, function (user) {
          displayUserInfo("Facebook", user.name, user.email, user.picture.data.url);
        });
      } else {
        console.warn("Facebook login not authorized");
        document.getElementById("loader").style.display = 'none';
      }
    });
  }
  
  // ---------------------
  // Display User Info
  // ---------------------
  function displayUserInfo(platform, name, email, pictureUrl) {
    document.getElementById("loader").style.display = 'none';
    document.getElementById("user-info").innerHTML = `
      <p><strong>${platform} User:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <img src="${pictureUrl}" alt="Profile Picture" />
    `;
  }
  
  // ---------------------
  // Logout Function
  // ---------------------
  function logout() {
    document.getElementById("user-info").innerHTML = '';
    document.getElementById("loader").style.display = 'none';
  
    // Facebook Logout (optional)
    if (typeof FB !== 'undefined') {
      FB.logout(function () {
        console.log("Logged out from Facebook");
      });
    }
  
    alert("You have been logged out.");
  }
  