import { useEffect } from 'react';


// import { useCallback } from 'react';
import { nanoid } from 'nanoid';
// import { Formik } from 'formik';
// import avatar from '../../img/avatar.png';
import { initialContactForm } from '../../services/initial';
import { useSelector, useDispatch } from 'react-redux';
import { Report } from 'notiflix/build/notiflix-report-aio';
// import { ReactComponent as IconUser } from '../../img/user.svg';
// import { ReactComponent as IconPhone } from '../../img/phone.svg';
import { addContact, editContact } from '../../redux/contacts/operations';
import { modalState, selectContact } from '../../redux/status/slice';
import { selectContacts, selectContactID, selectModalState } from '../../redux/status/selectors';
import { selectIsLoading, selectError } from '../../redux/contacts/selectors';
import Form from 'moduls/form/Form';
import { Container } from './ContactForm.styled';

const ContactForm = () => {
  const dispatch = useDispatch();
  const selectID = useSelector(selectContactID);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  // const closeModal = () => dispatch(modalState());
  const modalShow = useSelector(selectModalState);
  const error = useSelector(selectError);


  const initialState = () => {
    if (selectID) {
      const selectedContact = contacts.find(contact => contact.id === selectID);
      return selectedContact;
    } else {
      return initialContactForm;
    }
  };

  useEffect(() => {
    if (!isLoading && modalShow && !error) {
      dispatch(modalState());
      // resetForm();
    };
  }, [ dispatch, isLoading, error, modalShow]);


  const handleSubmit = ({ name, number }, { resetForm }) => {
    const dublName = contacts.find(
      contact => contact.name.toUpperCase() === name.toUpperCase()
    );
    const dublNumber = contacts.find(contact => contact.number === number);
    if (messageDubl(dublName, name, 'name')) return;
    if (messageDubl(dublNumber, number, 'phone nmber')) return;
    if (selectID) {
      const newContact = { id: selectID, name, number };
      dispatch(editContact(newContact));
      dispatch(selectContact(''));
    } else {
      const newContact = { id: nanoid(), name, number };
      dispatch(addContact(newContact));
    }


// console.log(isLoading);
// closeForm(resetForm);
    // if (!isLoading) {
    // resetForm();
    // closeModal();
    // }
  };
  


  const messageDubl = (dubl, field, name) => {
    if (dubl && dubl.id !== selectID) {
      Report.warning(
        `${field}`,
        `This ${name} is already in the contact list.`,
        'OK'
      );
      return true;
    } else return false;
  };

  return (
    <Container>
    <Form initialState={initialState()} onSubmit={handleSubmit} mode={selectID ? 'edit' : 'add'} />
    </Container>
  );
};

export default ContactForm;

{/* <Forma autoComplete="off">
        <Avatar src={avatar} alt="User avatar" />
        <List>
          <Item>
            <IconBox>
              <IconUser fill="currentColor" width="20px" height="20px" />
            </IconBox>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Item>
          <Item>
            <IconBox>
              <IconPhone fill="currentColor" width="20px" height="20px" />
            </IconBox>
            <Label htmlFor="number">Phone</Label>
            <Input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Item>
          <Item>
            <Button type="submit">
              {!selectID ? 'Add contact' : 'Edit contact'}
            </Button>
          </Item>
        </List>
      </Forma>
    </Formik> */}