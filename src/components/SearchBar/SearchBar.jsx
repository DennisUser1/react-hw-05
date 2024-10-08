import { Formik, Form, Field } from "formik";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import styles from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({ onSearch }) { 
  const initialValues = {
    query: "",
  };

  const handleFormSubmit = ({ query }, { resetForm }) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      const screenWidth = window.innerWidth; 
      const position = screenWidth < 768 ? 'bottomCenter' : 'topRight'; 

      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a valid search term.',
        position: position, 
      });
      return;
    }

    onSearch(trimmedQuery);
    resetForm();
  };

  return (
    <div className={styles.searchFormWrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {() => (
          <Form className={styles.searchForm}>
            <Field
              name="query"
              type="search"
              placeholder="Search Movies..."
              autoComplete="off"
              autoFocus
              aria-label="Search movies"
              className={styles.fieldSearch}
            />
            <button
              type="submit"
              className={styles.searchButton}
            >  
            <IoSearch className={styles.iconSearch} size="20"/>  
            Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

