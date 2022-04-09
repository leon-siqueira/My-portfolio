function openNavigation() {
  let navigation = document.getElementById("navbar-mobile");
  let links = document.getElementsByClassName("mobile-link");
  console.log(links)
  let delay = 1
  navigation.classList.remove("d-none");
  navigation.style.animation = "fadeIn 0.1s normal forwards ease-in-out"
  for (let index = 0; index < links.length; index++) {
    links[index].style.display = "inline"
    links[index].style.animation = `appearAndSkip 0.1s 0.${delay}s normal forwards ease-in-out`
    setTimeout(delay * 100);
    delay += 2
    console.log(links[index])
    setTimeout(() => {
      links[index].style.color = `black`
    }, delay * 80);
  }
  document.body.style.overflow = "hidden"
}

function closeNavigation() {
  let navigation = document.getElementById("navbar-mobile");
  let links = document.getElementsByClassName("mobile-link");
  for (let index = 0; index < links.length; index++) {
    links[index].style.color = `rgba(0, 0, 0, 0)`
  }
  document.body.style.overflow = "visible";
  navigation.style.animation = "fadeOut 0.1s"
  navigation.classList.add("d-none");
}
