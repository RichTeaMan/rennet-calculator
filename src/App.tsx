import './App.css';
import RennetCalculator from './components/RennetCalculator';
import { Box, Center, ChakraProvider } from '@chakra-ui/react';
import { padM } from './constants';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Center>
          <Box padding={padM(2)} maxWidth='xl'>
            <RennetCalculator />
          </Box>
        </Center>
      </ChakraProvider>
    </div>
  );
}

export default App;
