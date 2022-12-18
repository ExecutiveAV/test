// import { useSelector, useDispatch } from 'react-redux';
import classes from './userIcon.module.scss';

// import { updateLoginPortalStatus } from '../../../redux/portal/signinPortal';


// import Login from '../../login/login.component';

const UserIcon = () => {
    let userInitials = "AB";

    // const { isOpen } = useSelector(state => state.loggin);

    // const dispatch = useDispatch();

    //e => dispatch(updateLoginPortalStatus(!isOpen))

    return (
        <section className={classes.userIcon} >
            <p className={classes.initials} >{userInitials}</p>
{/* 
            {
                isOpen ? <Login ></Login> : ""
            } */}
        </section>
    );
};

export default UserIcon;