import React from "react";
import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
const modal = (props) => {
  const styles = [classes.Modal];
  props.show ? styles.push(classes.ModalShow) : styles.push(classes.ModalHide);
  return (
    <React.Fragment>
      <BackDrop show={props.show} handleClick={props.removeModal} />
      <div className={styles.join(" ")}>{props.children}</div>
    </React.Fragment>
  );
};

export default React.memo(modal);
