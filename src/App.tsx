import './App.css';
import RennetCalculator from './components/RennetCalculator';
import { Box, ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Box padding='16px' >
          <RennetCalculator />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
