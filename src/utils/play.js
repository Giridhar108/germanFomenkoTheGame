export default (id, time) => {
  setTimeout(() => {
    document.getElementById(`${id}`).classList.add('active');
    document.getElementById(`${id}`).click();
    setTimeout(() => {
      document.getElementById(`${id}`).classList.remove('active');
    }, 200);
  }, time);
};
