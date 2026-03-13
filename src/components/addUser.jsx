import { useState } from "react";
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomDialog } from "./customDialog";
import { registerUser } from "../api/queries/post";
import { getPlaces } from "../api/queries/getters";

export const AddUser = ({ open, handleClose }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        role: 'User',
        place_id: ''
    });

    const { data: placesData } = useQuery({
        queryKey: ['places'],
        queryFn: getPlaces,
    });

    const places = placesData?.data?.data || [];

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            handleClose();
            setFormData({ phone: '', password: '', role: 'User', place_id: '' });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            ...formData,
            place_id: Number(formData.place_id)
        });
    };

    return (
        <CustomDialog open={open} onClose={handleClose} title="Täze ulanyjy goşmak">
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                    label="Telefon nomeri"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Parol"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <FormControl fullWidth required>
                    <InputLabel id="place-select-label">Edarasy</InputLabel>
                    <Select
                        labelId="place-select-label"
                        name="place_id"
                        value={formData.place_id}
                        label="Edarasy"
                        onChange={handleChange}
                    >
                        {places.map((place) => (
                            <MenuItem key={place.id} value={place.id}>
                                {place.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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