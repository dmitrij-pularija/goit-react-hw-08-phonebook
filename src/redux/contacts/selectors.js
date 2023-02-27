// import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.phonebook.contacts;
export const selectIsLoading = state => state.phonebook.isLoading;
export const selectIsFulfilled = state => state.phonebook.isFulfilled;
export const selectError = state => state.phonebook.error;

// export const selectContactID = state => state.status.selectID;
// export const selectFilter = state => state.status.filter;
// export const selectModalState = state => state.status.modalShow;

// export const filterContacts = createSelector(
//   [selectContacts, selectFilter],
//   (contacts, filter) => {
//     const filtredContacts = contacts.filter(
//       contact =>
//         contact.name.toUpperCase().includes(filter.toUpperCase()) ||
//         contact.number.includes(filter)
//     );
//     return filtredContacts.sort((firstСontacts, secondСontacts) =>
//       firstСontacts.name.localeCompare(secondСontacts.name)
//     );
//   }
// );