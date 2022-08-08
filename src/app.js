import {page, render} from "./lib.js";
// import {homeView} from "./views/home.js";
import {getUserData} from "./util.js";
import {logout} from "./api/users.js";
import {catalogView} from "./views/catalog.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {createView} from "./views/create.js";
import {detailsView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {myBooksView} from "./views/my-books.js";

const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
// page('/', homeView);
page('/', catalogView);
page('/books/:id', detailsView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/my-books',myBooksView);
page('/edit/:id', editView);

//Start application
updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    next();
}

function renderMain(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/')
}