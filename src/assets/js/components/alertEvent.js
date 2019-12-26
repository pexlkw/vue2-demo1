
export function openMsg (msg, className) {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = msg;
  newDiv.className = `alert ${className}`;
  document.body.appendChild(newDiv);
}
