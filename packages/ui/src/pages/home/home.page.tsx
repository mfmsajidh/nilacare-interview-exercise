import {Container, Title, Stack} from '@mantine/core';
import {HomePageProps} from "./home.type";
import {FC} from "react";

export const HomePage: FC<HomePageProps> = ({title, children}: HomePageProps) => {
    return (
        <Container>
            <Stack gap="xl">
                <Title order={2}>{title}</Title>
                {children}
            </Stack>
        </Container>
    );
};
