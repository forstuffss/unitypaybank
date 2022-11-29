import styles from "./form.module.scss";

type IProps = {
  formSubmitHandler: (event: React.FormEvent) => void;
  isLoading: boolean;
};

function Form({
  children,
  formSubmitHandler,
  isLoading,
}: IProps & React.PropsWithChildren) {
  return (
    <form onSubmit={(e) => formSubmitHandler(e)} className={styles.form}>
      {children}
      <button type="submit" className="button button-pri">
        {isLoading ? <div className="loading"></div> : "Change Password"}
      </button>
    </form>
  );
}

export default Form;
