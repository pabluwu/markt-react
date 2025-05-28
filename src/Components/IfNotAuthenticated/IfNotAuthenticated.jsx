import { useAuth } from "../../services/AuthContext";

const IfNotAuthenticated = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? <>{children}</> : null;
};

export default IfNotAuthenticated;
