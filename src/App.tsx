import './App.css';
import RennetCalculator from './components/RennetCalculator';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <RennetCalculator />
      </ChakraProvider>
    </div>
  );
}

export default App;
