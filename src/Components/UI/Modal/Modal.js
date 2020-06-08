import React from "react";
import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
const modal = (props) => {
  const styles = [classes.Modal];
  props.order ? styles.push(classes.ModalShow) : styles.push(classes.ModalHide);
  console.log(styles);
  return (
    <React.Fragment>
      <BackDrop show={props.order} handleClick={props.removeModal} />
      <div className={styles.join(" ")}>{props.children}</div>
    </React.Fragment>
  );
};

export default modal;
