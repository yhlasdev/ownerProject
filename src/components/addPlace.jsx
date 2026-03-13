import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomDialog } from "./customDialog";
import { createPlace } from "../api/queries/post";

export const AddPlace = ({ open, handleClose }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        id: '',
        name: ''
    });

    const mutation = useMutation({
        mutationFn: createPlace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] });
            handleClose();
            setFormData({ id: '', name: '' });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'id' ? Number(value) : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <CustomDialog open={open} onClose={handleClose} title="Täze edara goşmak">
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                    label="Id"
                    name="id"
                    type="number"
                    value={formData.id}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Ady"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={mutation.isPending}
                    sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
                >
                    {mutation.isPending ? 'Ugradylýar...' : 'Goş'}
                </Button>
            </Box>
        </CustomDialog>
    );
};