// import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Person2Icon from '@mui/icons-material/Person2';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Styled Badge component for cart icon
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

// Navigation data
const NAVIGATION = [
  {
    segment: 'products',
    title: 'Products',
    icon: <CategoryIcon />,
    path: '/dashboard/products',
  },
  {
    segment: 'cart',
    title: 'Cart',
    icon: (
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={4} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    ),
    path: '/dashboard/cart',
  },
  {
    segment: 'wishlist',
    title: 'Wishlist',
    icon: <FavoriteIcon />,
    path: '/dashboard/wishlist',
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <Person2Icon />,
    path: '/dashboard/profile',
  },
];

// Demo theme setup
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Custom hook for routing logic
function useDemoRouter() {
  const navigate = useNavigate();

  // Modify handleNavigation to correctly trigger navigation
  const handleNavigation = (segment) => {
    const path = `/dashboard${segment}`;
    navigate(path); // Perform the navigation
  };

  
  return {
    navigate: handleNavigation, 
  };
}


const DashboardLayoutBasic = (props) => {
  const { window } = props;
  const router = useDemoRouter();  // Get the navigation object

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      branding={{ title: 'VEDA',
        homeUrl:'/home'
      }}
      navigation={NAVIGATION}
      router={router}  
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Outlet /> {/* Renders nested components like ProductsPage */}
      </DashboardLayout>
    </AppProvider>
  );
};


export default DashboardLayoutBasic;
