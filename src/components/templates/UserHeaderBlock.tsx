import { useState, MouseEvent } from 'react';

import { Logout, Person } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';

import { useAuth } from 'api/hooks/useAuth';
import { useAppSelector } from 'store';
import { getUser } from 'store/user';

export const UserHeaderBlock = () => {
  const { signOut } = useAuth();
  const user = useAppSelector(getUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <IconButton aria-label="user-menu" onClick={openMenu}>
        <Person />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        <MenuItem>
          <Avatar />
          <Typography pl={2}>{user?.email}</Typography>
        </MenuItem>

        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Вийти
        </MenuItem>
      </Menu>
    </>
  );
};
