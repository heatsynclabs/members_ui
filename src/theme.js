// Copyright 2019 Iced Development, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto, sans-serif',
      'Circular Std, sans-serif',
    ].join(','),
    fontSize: 12,
  },
  palette: {
    primary: {
      main: 'rgb(58,100,49)', // pine green
    },
    secondary: {
      main: 'rgb(215,98,35)', // brownish orange
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variant: 'contained',
          backgroundColor: 'rgb(215, 98, 35)',
          color: '#fff',
          textTransform: 'none',
          fontWeight: '100',
          fontSize: '.85rem',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: 'rgb(215,98,35)',
          borderRadius: 4,
          border: '1px solid #ced4da',
          marginTop: '7px',
          paddingLeft: '5px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
        body: {
          fontWeight: 700,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        colorAction: {
          color: 'rgb(255,170,69)',
        },
        colorError: {
          color: 'rgb(255,99,99)',
        },
      },
    },
  },
});

export default theme;
