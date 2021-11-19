/*JS document*/

function preLoader(elem){
    setTimeout(function(){

        $(elem).fadeOut("slow");

        showNotification();

        $('#SendQuote').click(function(){
            if($('#name').val() != "" && $('#email').val() != "" && $('#message').val() != "")
                sendQuote($('#name'), $('#email'), $('#message'));
            else
                alert("Field(s) left empty!");
        });

        $('#subscribeBtn').click(function(){
            checkEmail($('#emailInput'), $('#errorlbl'));
        });

    }, 1500);
}
function showNotification()
{
    if(!window.Notification){
        alert("Notification Not Supported!");
    }
    else{
        Notification.requestPermission()
        .then(function(perm){
            if(perm === 'granted'){
            
                var notify = new Notification('Demo Notification', {
                    body: 'Welcome To Edge Web Design',
                    icon: './img/icon.png'
                });
                setTimeout(function(){
                    notify.close();
                }, 10000);
            }
        })
        .catch(function(err){
            alert("Error Occurred In Getting Notification Permission!");
            console.log(err);
        });
    }
}
function checkEmail(email, errorlbl)
{
    if(email.val() != "")
    {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (!pattern.test(email.val())) {

            email.css('border', '1px solid red');
            errorlbl.text("Enter proper Email ID!");
            errorlbl.show();
        }
        else
        {
            email.val('');
            email.css('border', '');
            errorlbl.hide();
            alert("You Have Subscribed To Our Newsletter");
        }
    }
    else
    {
        email.css('border', '');
        errorlbl.hide();
        alert("Enter Email ID To Subscribe!");
    }
}
function sendQuote(name, email, message)
{
    const database = firebase.database().ref().child('CustomerQuotes');

    database.push().set({
        name: name.val(),
        email: email.val(),
        message: message.val()
    })
    .then(function(){
        name.val('');
        email.val('');
        message.val('');
        alert("Quote Sent Successfully");
    })
    .catch(function(err){
        alert("Error Occurred In Sending Quote!");
        console.log(err);
    });
}