import { Navigate } from "react-router-dom";
import { LocalStorageHelper } from "../../helper/local-storage.helper";

export function ProtectedRoute({ children = null }) {
    const isAuthenticated = LocalStorageHelper.IsCached();
    console.log('isLogged');
    console.log(isAuthenticated);

    return (
        isAuthenticated ? (children) : (<Navigate to="/" />)
    );
}

export default ProtectedRoute;