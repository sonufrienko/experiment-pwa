import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface ICountry {
  name: string;
  alpha2Code: string;
  capital: string;
  nativeName: string;
  flag: string;
}

const FlagWrapper = styled.div`
  display: flex;
`;

const FlagImage = styled.img`
  max-width: 32px;
  margin-right: 10px
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable() {
  const [list, setList] = useState<ICountry[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(json => setList(json))
      .catch(() => setList([]));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Native Name</TableCell>
            <TableCell align="right">Capital</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(country => (
            <TableRow key={country.name}>
              <TableCell component="th" scope="row">
                <FlagWrapper>
                  <FlagImage src={country.flag} />
                  {country.alpha2Code}
                </FlagWrapper>
              </TableCell>
              <TableCell align="left">{country.name}</TableCell>
              <TableCell align="left">{country.nativeName}</TableCell>
              <TableCell align="right">{country.capital}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
