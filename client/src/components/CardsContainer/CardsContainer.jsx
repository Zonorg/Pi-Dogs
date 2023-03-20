import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

const CardsContainer = () => {
  const users = [
    {
      id: "1",
      name: "Renzo",
      email: "Renzo@mg",
      phone: "1234",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "2313",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
    {
      id: "2",
      name: "Lucas",
      email: "dsada@mg",
      phone: "123224",
      created: true,
    },
  ];
  return (
    <div className={styles.containerCards}>
      {users.map((user) => {
        return (
          <Card
            id={user.id}
            name={user.name}
            phone={user.phone}
            email={user.email}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
