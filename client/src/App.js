import './App.css'; 
import styled from 'styled-components';
import Recipe from './Recipe';

function App() {
 
  const Title = styled.h1`
  font-size: 1.5em;
  text-align: center; 
`;

const Wrap = styled.div`
display: flex;
justify-content: center;
`;
  return (
    <Wrap >
       <Recipe />
    </Wrap>
  );
}

export default App;
