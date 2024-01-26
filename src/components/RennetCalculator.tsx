import { FC, useMemo, useState } from 'react';
import { Box, Heading, Link, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Center, Select, Divider } from '@chakra-ui/react';

const RennetCalculator: FC<{}> = () => {
    const inputLeftWidth = '10em';

    const [rennetStrength, setRennetStrength] = useState<number>(NaN);
    const [rennetUnit, setRennetUnit] = useState<string>('mL');
    const [milk, setMilk] = useState<number>(NaN);

    const [rennetQuantity, setRennetQuanity] = useState<number>(NaN);

    useMemo(() => {

        setRennetQuanity(NaN);

        if ((rennetStrength === 0 || isNaN(rennetStrength)) &&
            (milk === 0 || isNaN(milk))) {
            return;
        }
        // 1 IMCU coagulates 10mL (0.01L) of milk.

        const unitConstant = 0.01;
        const milkPerUnit = (rennetStrength * unitConstant);

        const newRennetQuantity = milk / milkPerUnit;
        setRennetQuanity(newRennetQuantity);

    }, [rennetStrength, milk]);

    return (
        <Box>
            <Heading>Rennet Calculator</Heading>
            <p>
                Rennet strength is calculated via the Internation Milk Clotting Unit.
            </p>
            <p>
                Maths inspired by <Link href="https://www.littlegreencheese.com/2019/07/rennet-strength-explained.html">littlegreencheese.com</Link>.
            </p>

            <Center>
                <Stack spacing={4} width='xl'>
                    <Box textAlign='left'>
                        <Heading size='md'>
                            Rennet strength:
                        </Heading>
                        <InputGroup>
                            <InputLeftAddon width={inputLeftWidth}>
                                Rennet Strength
                            </InputLeftAddon>
                            <Input type='number' textAlign='right' onChange={e => setRennetStrength(e.target.valueAsNumber)} />
                            <InputRightAddon>
                                <Select onChange={e => setRennetUnit(e.target.value)}>
                                    <option value='mL'>IMCU/mL</option>
                                    <option value='mg'>IMCU/mg</option>
                                </Select>
                            </InputRightAddon>
                        </InputGroup>
                        Rennet strength is usually measured in IMCU/mL, or IMCU/mg, depending if the rennet is liquid or a powder.
                        The strength should be indiciated on the rennet packaging, make sure the unit is correct.
                    </Box>
                    <Divider />
                    <Box textAlign='left'>
                        <Heading size='md'>
                            Milk quantity:
                        </Heading>
                        <InputGroup>
                            <InputLeftAddon width={inputLeftWidth}>
                                Milk
                            </InputLeftAddon>
                            <Input type='number' textAlign='right' onChange={e => setMilk(e.target.valueAsNumber)} />
                            <InputRightAddon>
                                <Select>
                                    <option value='l'>L</option>
                                </Select>
                            </InputRightAddon>
                        </InputGroup>
                        The quantity of milk.
                    </Box>
                    <Divider />
                    {rennetQuantity ? <Box>
                        You require {rennetQuantity.toFixed(1)}{rennetUnit} of {rennetStrength}IMCU/{rennetUnit} strength rennet.
                    </Box> : <Box>
                        Enter a rennet and milk quantity.
                    </Box>}
                </Stack>
            </Center>
        </Box>
    );
}

export default RennetCalculator;
