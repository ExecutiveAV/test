import classes from './SideBar.module.scss';

import UserIcon from './userIcon.component';

const SideBar = () => {
    return (
        <section className={classes.sideBar} >
            <UserIcon />
        </section>
    );
};

export default SideBar;