import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import {
  CreateButton,
  SearchTextField,
  FilterButton,
} from './TrustRelationship.styled';
import { StateSelectFilter, TypeSelectFilter, RequestTypeSelectFilter, ResetButton } from './TrustRelationshipsFilters';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Loader } from '../../components/UI/components/Loader/Loader';
import { useTrustRelationshipsContext } from '../../store/TrustRelationshipsContext';
import {
  TableCellStyled,
  TooltipStyled,
} from '../MyTransfers/TransfersTable.styled';
import TrustRelationshipSidePanel from './trustRelationshipSidePanel';

const TrustRelationshipTableHeader = ({ tableTitle, getStatusColor }) => {

  const { filter, 
          setFilter, 
          statesList, 
          requestTypeList, 
          typeList, 
          defaultFilter,
          searchString,
          setSearchString 
        } = useTrustRelationshipsContext();
 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  console.log(`Search ${searchString}`);

  return (
    <Grid item container sx={{ height: '5rem', marginBottom: '20px' }}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'start' }}>
        <Typography variant={'h3'}>{tableTitle}</Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: 'flex', justifyContent: 'end', alignItems: 'flex-end' }}
      >
        <CreateButton type="button" variant="contained">
          + Create
        </CreateButton>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <SearchTextField
          variant="outlined"
          placeholder="Search by Wallet..."
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
          InputProps={{
            style: { fontSize: '14px' },
            startAdornment: (
              <SearchIcon
                style={{ color: 'gray', fontSize: '25px', marginRight: '10px' }}
              />
            ),
          }}
        />
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <FilterButton type="button" onClick={handleClick}>
          Filters
          <FilterListIcon style={{ color: '#86C232', marginLeft: '8px' }} />
        </FilterButton>
        <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
             
            >
        <Grid container direction="column"  sx={{ padding: '20px', }}>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
            <StateSelectFilter
              filter={filter}
              setFilter={setFilter}
              statesList={statesList}
              getStatusColor={getStatusColor}
            />
             <RequestTypeSelectFilter
              filter={filter}
              setFilter={setFilter}
              requestTypeList={requestTypeList}
              getStatusColor={getStatusColor}
            />
               <TypeSelectFilter
              filter={filter}
              setFilter={setFilter}
              typeList={typeList}
              getStatusColor={getStatusColor}
            />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '20px' }}>
          </Grid>
          <Grid item xs={2} sx={{
                                   display: 'flex', 
                                   justifyContent: 'space-around', 
                                   alignItems: 'center',
                                   margin: '10px auto',
                                   gap: '10px',

                                   }}>
            <ResetButton close={handleClose} setFilter={setFilter} defaultFilter={defaultFilter} />
            <button
              style={{ 
                color: 'black',
                border: 'none',
                backgroundColor: 'rgba(114, 185, 7, 0.192)',
                padding: '8px 20px',
                borderRadius: '2rem',
            }}
            onClick={handleClose}
            >
             <h4> Apply</h4>
            </button>
          </Grid>    
        </Grid>
      </Menu>
      </Grid>
    </Grid>
  );
};

/**@function
 * @description Renders a table cell with a tooltip that shows when the cell is overflowed
 * @param {string} cellValue Value inside the cell and tooltip
 * @param {string} cellColor Color of the cell value
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const OverflownCell = ({ cellValue, cellColor, children }) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const textElementRef = useRef();

  useEffect(() => {
    setIsOverflown(
      textElementRef.current.scrollWidth > textElementRef.current.clientWidth
    );
  }, []);

  return (
    <TooltipStyled
      title={<p style={{ fontSize: '12px' }}>{cellValue}</p>}
      disableHoverListener={!isOverflown}
      arrow
    >
      <TableCellStyled
        ref={textElementRef}
        align={'center'}
        sx={{
          color: `${cellColor}`,
        }}
      >
        {children}
      </TableCellStyled>
    </TooltipStyled>
  );
};

const TrustRelationshipTableBody = ({ tableColumns, tableRows }) => {
  let sortedTableRows = [...tableRows].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  sortedTableRows = [...sortedTableRows].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );
  sortedTableRows = [...sortedTableRows].sort((a, b) =>
    b.state.localeCompare(a.state)
  );

  // State to track the index of the selected row
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const { searchString } = useTrustRelationshipsContext()


  // state to track if side panel is open when you click the row on table 
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Function to handle row click and open side panel
  const handleRowClick = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    setIsSidePanelOpen(true);
  };

    //function to close side panel
  const handleClosePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedRowIndex(null);
  };

  const { isLoading } = useTrustRelationshipsContext();
  if (isLoading)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12}>
            <Loader />
          </TableCell>
        </TableRow>
      </TableBody>
    );

  if (tableRows.length === 0)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    );

  return (
    <>
    <TableBody>
      {sortedTableRows &&
        sortedTableRows
        .filter(
          (row) =>
            row.actor_wallet?.toLowerCase().includes(searchString.toLowerCase()) ||
            row.target_wallet?.toLowerCase().includes(searchString.toLowerCase())
        )
        .map((row, rowIndex) => {
          const isSelected = rowIndex === selectedRowIndex;
          return (
            <TableRow
              key={rowIndex}
              onClick={() => handleRowClick(rowIndex)}
              sx={{ transition: 'all 0.3s ease' }}
              style={{
                backgroundColor:
                  isSelected && row.state == 'pending'
                    ? 'rgba(135, 195, 46, .4)'
                    : isSelected
                    ? 'rgba(135, 195, 46, .4)'
                    : row.state == 'pending'
                    ? 'rgba(135, 195, 46, .1)'
                    : null,
              }}
            >
              {tableColumns.map((column, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}-${column.description}`;
                const cellColor =
                  column.name === 'state' ? row[column.name] : '';
                const cellValue =
                  row[column.name] || row[column.name] === 0
                    ? column.renderer
                      ? column.renderer(row[column.name])
                      : row[column.name]
                    : '--';
                return (
                  <OverflownCell
                    key={cellKey}
                    cellValue={cellValue}
                    cellColor={cellColor}
                  >
                    {cellValue}
                  </OverflownCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
    {isSidePanelOpen && (
        <TrustRelationshipSidePanel
          open={open}
          onClose={handleClosePanel}
        />
      )}

    </>
  );
};

function TrustRelationshipTable({ tableTitle, tableRows, totalRowCount }) {
  const { pagination, setPagination, tableColumns } =
    useTrustRelationshipsContext();

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);

    const newPagination = {
      limit: newRowsPerPage,
      offset: 0,
    };
    setPagination(newPagination);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    const newPagination = { ...pagination, offset: newPage * rowsPerPage };
    setPagination(newPagination);
  };

  return (
    <Grid container direction={'column'} sx={{ height: '100%' }}>
      <TrustRelationshipTableHeader tableTitle={tableTitle} />
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="trust relationships table"
          data-testid="trust-relationships-table"
        >
          <TableHead>
            <TableRow>
              {tableColumns.map((column, id) => {
                return (
                  <TableCellStyled
                    key={`${id}-${column.description}`}
                    sx={{ fontSize: '14px' }}
                    align={'center'}
                  >
                    {column.description}
                  </TableCellStyled>
                );
              })}
            </TableRow>
          </TableHead>
          <TrustRelationshipTableBody
            tableColumns={tableColumns}
            tableRows={tableRows}
          />
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50]}
        component={'div'}
        count={totalRowCount}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        onPageChange={(e, newPage) => handlePageChange(e, newPage)}
        data-testid="table-pagination"
      />
    </Grid>
  );
}

export default TrustRelationshipTable;
