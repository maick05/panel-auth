// import style from "./Loading.module.scss";
import React, { useEffect } from 'react';
import { Modal } from 'semantic-ui-react'

export function Alert({ header = 'Error', content = '', openAlert = false }) {
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        setOpen(openAlert)
    }, [openAlert]);

    return (
        <>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                header={header}
                content={content}
                actions={{ key: 'close', content: 'Close', positive: false }}
            />
        </>
    );
}