import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 12,
  },
  name: {
    fontWeight: 700,
    marginRight: 12,
  },
};

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);

  return (
    <div style={styles.container}>
      <Avatar alt="avatar" width="32" style={styles.avatar} />
      <span style={styles.name}>Welcome, {name}</span>
      <IconButton
        aria-label="logout"
        title="Logout"
        onClick={() => dispatch(authOperations.logOut())}
      >
        <MeetingRoomIcon />
      </IconButton>
      {/* <button type="button" onClick={() => dispatch(authOperations.logOut())}>
        Log Out
      </button> */}
    </div>
  );
}
