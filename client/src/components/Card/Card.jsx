import styles from "./Card.module.css"

const Card = (props) => {
  return (
    <div className={styles.containerCard}>
      <p>Name: {props.name}</p>
      <p>Email: {props.email}</p>
      <p>Phone: {props.phone}</p>
    </div>
  );
};
export default Card;
