import './App.css';
import RennetCalculator from './components/RennetCalculator';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { padM } from './constants';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Box padding={padM(2)} >
          <RennetCalculator />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
