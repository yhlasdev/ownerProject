import { Box, Typography, Container, Button } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { getAllDocuments } from '../api/queries/getters';
import { Home_card } from '../components/home_card';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate()

    const { data: documents = [], isLoading, isError, error } = useQuery({
        queryKey: ['documents'],
        queryFn: async () => await getAllDocuments()
    });

    const allDocuments = documents?.data?.data || [];

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h4" component="h1" fontWeight="800" sx={{ mb: 4 }}>
                        Gelen dokumentler
                    </Typography>
                    <Button sx={{ height: '40px' }} variant='contained' onClick={() => navigate('/admin')}> admin </Button>
                </Box>

                {isLoading ? (<Box> yuklenyar... </Box>) :
                    isError ? (<Box> error </Box>) : (
                        <Box className='flex flex-wrap -m-1'>
                            {allDocuments?.map((item) => (
                                <Home_card key={item.guid} item={item} />
                            ))}
                        </Box>
                    )}
            </Container>
        </Box>
    );
}