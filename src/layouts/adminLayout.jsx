import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    overflow: 'auto',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default AdminLayout;