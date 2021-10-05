# Invoice app

View live project - [Live Project](https://vue-invoice-app.herokuapp.com/)

View Figma design file - [Figma design](https://www.figma.com/file/reAmtxIG4MJHTCLHwBlyF7/invoice-app?node-id=0%3A1)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser

### Screenshot

![](./preview.jpg)

## My process

### Built with

- [VueJs 3](https://vuejs.org/) - JS library
- [VueX](https://vuex.vuejs.org/) - For Statemanagement
- [Firebase DB](https://firebase.com) - Backend
- Mobile-first workflow
- Flexbox

### What I learned

I challenged myself to use firebase in a different way then what I'm used too, rather then the fetch HTTP requests I used the firebaseApp to make a direct connect as shown bellow.

Some code I'm proud of:

For example this VueX Action here is responsible for fethcing the main data, where it is then stored in VueX to prevent needing to re-fetch it at a latter point in the app.

```js
  import DB from "../firebase/firebaseInnit";

  async GET_INVOICES({ commit, state }) {
    const getData = DB.collection("invoices");
    const results = await getData.get();
    results.forEach((doc) => {
      if (!state.invoiceData.some((invoice) => invoice.docId === doc.id)) {
        data = {
          .....
        };
        commit("SET_INVOICE_DATA", data);
      }
    });

    commit("INVOICES_LOADED");
  }
```

Another example of some clean code written is for the update invoice action, also handled in the VueX in order to keep the components lean.

```js
  async UPDATE_INVOICE({commit, dispatch}, {docId, routeId}){
    commit('DELETE_INVOICE', docId);
    await dispatch('GET_INVOICES');
    commit('TOGGLE_INVOICE');
    commit('TOGGLE_EDIT_INVOICE');
    commit('SET_CURRENT_INVOICE', routeId);
  },

```

### Continued development

For future updates I would really want to add user authenticaion and a export invoice to PDF feature.



## Author

- Website - [Pierpaolo Portfolio](https://www.pierpaolo-portfolio.xyz/)
