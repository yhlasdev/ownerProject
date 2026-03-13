import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../api/queries/getters';
import { useOpenClose } from '../hooks/useOpenClose';
import { AddPlace } from '../components/addPlace';
import { AddOutlined } from '@mui/icons-material';

const Places = () => {
    const { open, handleOpen, handleClose } = useOpenClose();

    const { data: places = [] } = useQuery({
        queryKey: ['places'],
        queryFn: async () => await getPlaces(),
    });

    const receivedPlaces = places?.data?.data;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Edaralar
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    onClick={handleOpen}
                    sx={{ px: 3, py: 1, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                >
                    Döret
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receivedPlaces?.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddPlace open={open} handleClose={handleClose} />
        </Box>
    );
};

export default Places;
