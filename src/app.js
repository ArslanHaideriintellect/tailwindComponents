import Dashboard from "./components/dashboard";
import Detail from "./components/detailList";
import axios from "axios";
import { titleHandler } from "./components/utilities";
import DummyData from "./data.json"
let rootDiv = document.getElementById("main-app");

// Here we initialize the first component of the app
const app = () => {
  rootDiv.innerHTML = Dashboard();
};
app();

console.log(DummyData,"dummy data")
// Method for population the main DashboardArea
const dashBoardInitiate = () => {
  axios.get("https://a.tuk.dev/ops/comTree").then((res) => {
    let webAppComponents = res.data.tree.children.find(
      (sin) => sin.name === "webapp"
    );
    let mainDiv = document.getElementById("main-row");
    for (let i = 0; i < webAppComponents.children.length; i++) {
      let thumbnail = document.createElement("div");
      let title = document.createElement("p");
      let Number = document.createElement("span");
      let innerDiv = document.createElement("div");
      innerDiv.addEventListener("click", function () {
        RouteHandler(
          "/detail?type=webapp&title=" + webAppComponents.children[i].name
        );
      });
      innerDiv.classList.add(
        "xl:w-1/3",
        "sm:w-5/12",
        "sm:max-w-xs",
        "mb-20",
        "xl:max-w-sm",
        "lg:w-1/2",
        "cursor-pointer"
      );
      title.classList.add("text-base", "font-medium");
      Number.classList.add("text-xs", "text-gray-600");
      title.innerText = titleHandler(webAppComponents.children[i].name);
      Number.innerText =
        webAppComponents.children[i].children.length + " " + "Components";
      thumbnail.style.height = "200px";
      thumbnail.classList.add("w-full", "bg-gray-300", "rounded", "mb-4");
      innerDiv.appendChild(thumbnail);
      innerDiv.appendChild(title);
      innerDiv.appendChild(Number);
      mainDiv.appendChild(innerDiv);


    }

  }).catch(err=>{
    let webAppComponents =DummyData.tree.children.find(
      (sin) => sin.name === "webapp"
    );
    let mainDiv = document.getElementById("main-row");
    for (let i = 0; i < webAppComponents.children.length; i++) {
      let thumbnail = document.createElement("div");
      let title = document.createElement("p");
      let Number = document.createElement("span");
      let innerDiv = document.createElement("div");
      innerDiv.addEventListener("click", function () {
        RouteHandler(
          "/detail?type=webapp&title=" + webAppComponents.children[i].name
        );
      });
      innerDiv.classList.add(
        "xl:w-1/3",
        "sm:w-5/12",
        "sm:max-w-xs",
        "mb-20",
        "xl:max-w-sm",
        "lg:w-1/2",
        "cursor-pointer"
      );
      title.classList.add("text-base", "font-medium");
      Number.classList.add("text-xs", "text-gray-600");
      title.innerText = titleHandler(webAppComponents.children[i].name);
      Number.innerText =
        webAppComponents.children[i].children.length + " " + "Components";
      thumbnail.style.height = "200px";
      thumbnail.classList.add("w-full", "bg-gray-300", "rounded", "mb-4");
      innerDiv.appendChild(thumbnail);
      innerDiv.appendChild(title);
      innerDiv.appendChild(Number);
      mainDiv.appendChild(innerDiv);


    }


  });
};
dashBoardInitiate();


// Method for handling detail Page
const singlePageHandler = () => {


  axios.get("https://a.tuk.dev/ops/comTree").then((res) => {
    let webAppComponents = res.data.tree.children.find(
      (sin) => sin.name === "webapp"
    );
    if (!!window.location.search) {
      let mainList = document.getElementById("children-list");
      let title = window.location.search.split("title=")[1];
      let listItems = webAppComponents.children.find(
        (sin) => sin.name === title
      );
      for (let i = 0; i < listItems.children.length; i++) {
        console.log(listItems.children.length, "check");
        let list = document.createElement("li");
        list.classList.add("mb-4", "text-xl", "cursor-pointer");
        list.innerText = i + 1 + " " + listItems.children[i].name;
        mainList.appendChild(list);
      }
    }
  }).catch(err=>{
    let webAppComponents = DummyData.tree.children.find(
      (sin) => sin.name === "webapp"
    );
    if (!!window.location.search) {
      let mainList = document.getElementById("children-list");
      let title = window.location.search.split("title=")[1];
      let listItems = webAppComponents.children.find(
        (sin) => sin.name === title
      );
      for (let i = 0; i < listItems.children.length; i++) {
        console.log(listItems.children.length, "check");
        let list = document.createElement("li");
        list.classList.add("mb-4", "text-xl", "cursor-pointer");
        list.innerText = i + 1 + " : " + listItems.children[i].name;
        mainList.appendChild(list);
      }
    }
  });
};

// Working with routing
const routes = {
  "/": Dashboard(),
  "/detail": Detail(),
};

const RouteHandler = (pathName) => {
  let MainRoute = pathName.split("?")[0];
  window.history.pushState({}, pathName, window.location.origin + pathName);
  singlePageHandler();
  rootDiv.innerHTML = routes[MainRoute];
};

if (!!window.location.search) {
  RouteHandler(window.location.pathname + window.location.search);
}
window.onpopstate = () => {
  dashBoardInitiate();
  rootDiv.innerHTML = routes[window.location.pathname];
};
