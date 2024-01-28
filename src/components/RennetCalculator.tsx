import { FC, useMemo, useState } from 'react';
import { Box, Heading, Link, Input, InputGroup, InputRightAddon, Stack, Center, Select, Divider, Text, Flex, Spacer, Tooltip, ListItem, UnorderedList } from '@chakra-ui/react';
import { padM } from '../constants';
import { FaGithub } from "react-icons/fa";

const RennetCalculator: FC<{}> = () => {

    const [rennetStrength, setRennetStrength] = useState<number>(NaN);
    const [rennetUnit, setRennetUnit] = useState<string>('mL');
    const [milk, setMilk] = useState<number>(NaN);

    const [requiredIMCUs, setRequiredIMCUs] = useState<number>(NaN);

    const [rennetQuantity, setRennetQuanity] = useState<number>(NaN);

    useMemo(() => {

        setRennetQuanity(NaN);

        if ((rennetStrength === 0 || isNaN(rennetStrength)) &&
            (milk === 0 || isNaN(milk))) {
            return;
        }

        // 1 IMCU coagulates 10mL (0.01L) of milk.
        const unitConstant = 0.01;
        setRequiredIMCUs(milk / unitConstant);

        const milkPerUnit = rennetStrength * unitConstant;

        const newRennetQuantity = milk / milkPerUnit;
        setRennetQuanity(newRennetQuantity);

    }, [rennetStrength, milk]);

    const rennetQuantityStr = (): string => {

        return `${requiredIMCUs.toFixed(0)}IMCUs`;
    };

    return (
        <Box>
            <Flex>
                <Heading>Rennet Calculator</Heading>
                <Spacer />
                <Center>
                    <Link href='https://github.com/RichTeaMan/rennet-calculator'>
                        <FaGithub />
                    </Link>
                </Center>
            </Flex>
            <Text padding={padM(2)} textAlign='left'>
                Rennet strength is calculated via the Internation Milk Clotting Unit.
                This tool will tell you how much rennet of a particular strength
                is needed to coagulate the given amount of milk.
            </Text>
            <Text padding={padM(2)} textAlign='left'>
                Maths inspired by <Link href="https://www.littlegreencheese.com/2019/07/rennet-strength-explained.html">littlegreencheese.com</Link>.
            </Text>

            <Divider paddingTop={padM(2)} />

            <Center>
                <Stack spacing={4} paddingTop={padM(2)}>
                    <Box textAlign='left'>
                        <Heading size='md'>
                            Rennet strength:
                        </Heading>
                        <InputGroup>
                            <Input type='number' textAlign='right' onChange={e => { if (e.target.value.length === 0 || !isNaN(e.target.valueAsNumber)) setRennetStrength(e.target.valueAsNumber) }} value={rennetStrength} />
                            <InputRightAddon>
                                <Select onChange={e => setRennetUnit(e.target.value)}>
                                    <option value='mL'>IMCU/mL</option>
                                    <option value='mg'>IMCU/mg</option>
                                </Select>
                            </InputRightAddon>
                        </InputGroup>
                        <Text padding={padM(2)}>
                            Rennet strength is usually measured in IMCU/mL or IMCU/mg, depending if the rennet is liquid or a powder.
                            The strength should be indiciated on the rennet packaging, make sure the unit is correct.
                        </Text>
                        <Text padding={padM(2)}>
                            If the strength is not listed as a number, it might be 'single strength'.
                            <UnorderedList>
                                <ListItem>'Single strength' is 200 IMCU.</ListItem>
                                <ListItem>'Double strength' is 400 IMCU.</ListItem>
                                <ListItem>'Triple strength' is 600 IMCU.</ListItem>
                            </UnorderedList>
                        </Text>
                    </Box>
                    <Divider />
                    <Box textAlign='left'>
                        <Heading size='md'>
                            Milk quantity:
                        </Heading>
                        <InputGroup>
                            <Input type='number' textAlign='right' onChange={e => { if (e.target.value.length === 0 || !isNaN(e.target.valueAsNumber)) setMilk(e.target.valueAsNumber)}} value={milk} />
                            <InputRightAddon>
                                L
                            </InputRightAddon>
                        </InputGroup>
                        <Text padding={padM(2)}>
                            The quantity of milk in litres. More rennet is required to coagulate a greater quantity of milk.
                        </Text>
                    </Box>
                    <Divider />
                    <Box textAlign='left'>
                        {rennetQuantity ? <Box >
                            <Heading size='md' >
                                Calculation:
                            </Heading>
                            <Text padding={padM(2)}>
                                {milk}L of milk requires <Tooltip label='An IMCU (International Milk Clotting Unit) coagulates 10mL of milk.'>{rennetQuantityStr()}</Tooltip> to coagulate.
                            </Text>
                            <Text padding={padM(2)}>
                                Therefore, you require <Text as='b'>{rennetQuantity.toPrecision(1)}{rennetUnit} of {rennetStrength}IMCU/{rennetUnit}</Text> strength rennet.
                            </Text>

                        </Box> : <Box padding={padM(2)}>
                            Enter a rennet and milk quantity.
                        </Box>}
                    </Box>
                </Stack>
            </Center>
        </Box>
    );
}

export default RennetCalculator;
