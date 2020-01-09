
export function openAlertMsg (msg, className) {
  const newDiv = document.createElement('div');
  const iconClass = (className === 'alert-danger') ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';
  newDiv.innerHTML = `<div class="alert ${className}"><i class="fas ${iconClass}"></i> ${msg} </div>`;
  newDiv.className = 'alert-box';
  document.body.appendChild(newDiv);
  setTimeout(() => {
    clearMsg(newDiv)
  }, 3000);
}

export function clearMsg (element) {
  document.body.removeChild(element);
}
