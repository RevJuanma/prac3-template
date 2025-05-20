import "./App.css";
import Container from "./components/Container/Container";
import CustomButton from "./components/CustomButton/CustomButton";

function App() {
  return (
    <div className="">
      Hola mundo
      <br></br>
      <CustomButton
        num1={10}
        num2={1203}
        texto={"Sumar"}
        handleClick={() => {
          console.log("CLickeado");
        }}
      />
      <Container>
        <input type="password" value={"123"}></input>
      </Container>
    </div>
  );
}

export default App;
