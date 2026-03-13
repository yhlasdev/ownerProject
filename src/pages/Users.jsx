import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/queries/getters'
import { useOpenClose } from '../hooks/useOpenClose';
import { AddUser } from '../components/addUser';
import { AddOutlined } from '@mui/icons-material';

const Users = () => {
    const { open, handleOpen, handleClose } = useOpenClose();

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => await getUsers(),
    });

    const receivedUsers = users?.data?.data;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Ulanyjylar
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
                            <TableCell sx={{ fontWeight: 'bold' }}>Telefon nomeri</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Edarasy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receivedUsers?.map((row, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{row?.phone}</TableCell>
                                <TableCell>{row?.place?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddUser open={open} handleClose={handleClose} />
        </Box>
    );
};

export default Users;
