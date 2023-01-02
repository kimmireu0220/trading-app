import AlgorithmItem from "./AlgorithmItem";

import classes from "./AlgorithmList.module.css";

const AlgorithmList = () => {
  const DUMMY_ITEMS = [
    { id: 1, title: "This is first test title" },
    { id: 2, title: "This is second test title" },
    { id: 3, title: "This is third test title" },
  ];

  return (
    <ul className={classes.list}>
      {DUMMY_ITEMS.map((item) => (
        <AlgorithmItem key={item.id} title={item.title} />
      ))}
    </ul>
  );
};

export default AlgorithmList;
