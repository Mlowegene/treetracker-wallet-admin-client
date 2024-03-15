import { Grid } from '@mui/material';
import TrustRelationshipTable from './TrustRelationshipTable';
import {useTrustRelationshipsContext} from '../../store/TrustRelationshipsContext';
import Message from '../../components/UI/components/Message/Message';
import AuthContext from '../../store/auth-context';

import { getTrustRelationships } from '../../api/trust_relationships';
import { useState, useContext, useEffect } from 'react';

function TrustRelationship() {
  // get data from context,
      const { filter, 
          pagination, 
          setIsLoading, 
          prepareRows, 
          setTableRows, 
          tableRows 
      } = useTrustRelationshipsContext();



   // error
   const [message, setMessage] = useState('');
 
 
   // total rows count for pagination
   const [totalRowCount, setTotalRowCount] = useState(null);
 
   const authContext = useContext(AuthContext);
   
 
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const data = await getTrustRelationships(authContext.token, {pagination, filter});

        const preparedRows = prepareRows(await data.trust_relationships);
        setTableRows(preparedRows);
        setTotalRowCount(data.total);
       
        
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while fetching the table data');
      }finally {
        setIsLoading(false);
       }
    };
    loadData();
  }, [pagination, filter, setTableRows, setTotalRowCount]);
 


  return (
    <div
      style={{
        marginTop: '5rem',
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        marginRight: '1rem',
        width: '100%',
      }}
    >
      {message && <Message message={message} onClose={() => setMessage('')} />}
      <Grid container direction="column" sx={{ flexGrow: '1' }}>
        <TrustRelationshipTable
        tableTitle={'Trust Relationship'}
        tableRows={tableRows}
        totalRowCount={totalRowCount}
        />
      </Grid>
    </div>
  );
}

export default TrustRelationship;
