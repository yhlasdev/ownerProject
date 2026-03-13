import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';
import { HomeHeader } from '../components/homeComponents/homeHeader';
import { HomeDocuments } from '../components/homeComponents/homeDocuments';


export default function DocumentPage() {
    const { guid } = useParams();

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.50', overflow: 'hidden' }}>
            <Box
                sx={{
                    width: '250px',
                    flexShrink: 0,
                    bgcolor: 'background.paper',
                    borderRight: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography className=' text-center' variant="h4" fontWeight="bold" color="text.primary">
                        Arzalar
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                flexGrow: 1,
                minWidth: 0,
                height: '100vh',
                overflowY: 'auto'
            }}>
                <Box sx={{ p: 4 }}>
                    <HomeHeader guid={guid} />
                </Box>
                <Divider />
                <Box sx={{ p: 4 }}>
                    <HomeDocuments guid={guid} />
                </Box>
            </Box>
        </Box>
    );
}