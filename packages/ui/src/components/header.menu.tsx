import {Container, Tabs, Text} from '@mantine/core';
import {useLocation, useNavigate} from 'react-router';

export const HeaderMenu = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (
        <Container size="lg">
            <Tabs variant="pills" defaultValue="/" value={pathname}>
                <Tabs.List my="md">
                    <Tabs.Tab value="/" onClick={() => navigate('/')} style={{borderRadius: '8px'}}>
                        <Text fz={14}> Home </Text>
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Container>
    );
};
