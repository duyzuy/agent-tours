import React from "react";
const withAuth = (Comp: JSX.ElementType) => {
    return (
        <>
            <Comp />
        </>
    );
};
export default withAuth;
