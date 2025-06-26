import {ActionIcon, AppShell, Group, Image} from '@mantine/core';
import {IconLogout} from '@tabler/icons-react';
import {Outlet, useNavigate} from 'react-router';
import Logo from './assets/images/logo.png';
import {HeaderComponent} from '@components';
import {useAuthStore} from '@store';

export function App() {
    const navigate = useNavigate();
    const {logout} = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppShell header={{height: 60}} padding="md">
            <AppShell.Header px={'xs'}>
                <Group justify={'space-between'} h={'100%'}>
                    <Image src={Logo} visibleFrom={'sm'} maw={100} onClick={() => navigate('/')}/>
                    <Group gap={'xs'}>
                        <HeaderComponent/>

                        <ActionIcon size={'sm'} variant={'transparent'} onClick={handleLogout}>
                            <IconLogout/>
                        </ActionIcon>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}
