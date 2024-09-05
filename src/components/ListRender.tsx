function ListRender() {
  const tasks = ["เบิกงบ", "ซื้อคอม", "เขียนโปรแกรม"];
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task}>{task}</li>
      ))}
    </ul>
  );
}
export default ListRender;
