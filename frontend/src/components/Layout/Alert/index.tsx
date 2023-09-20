import { forwardRef, useImperativeHandle, useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type functionButtonColor = 'primary' | 'danger'

type Props = {
    closeText: string;
    functionText: string;
    functionButtonColor?: functionButtonColor;
    execFunctionOnAccept: any;
    alertTitle: JSX.Element | string;
    alertContentText: JSX.Element | string;
}

const AlertModal = forwardRef(({ 
    closeText, 
    functionText, 
    functionButtonColor = 'primary',
    execFunctionOnAccept, 
    alertTitle, 
    alertContentText  
}: Props, ref) => {

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleOpenAlert = () => {
        setIsAlertOpen(true);
    }

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    }

    useImperativeHandle(ref, () => ({
        open: handleOpenAlert,
        close: handleCloseAlert,
    }));

    return (
        <Dialog
            open={isAlertOpen}
            onClose={handleCloseAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alertTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertContentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAlert}>{closeText}</Button>
                {functionButtonColor === 'primary' && 
                    <Button onClick={execFunctionOnAccept} autoFocus>
                        {functionText}
                    </Button>
                }

                {functionButtonColor === 'danger' && 
                    <Button onClick={execFunctionOnAccept} color="error" autoFocus>
                        {functionText}
                    </Button>
                }

            </DialogActions>
        </Dialog>
    );
})

export default AlertModal;